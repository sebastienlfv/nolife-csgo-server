const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const cors = require('cors')
const app = express()
const passport = require('passport');
const passportSteam = require('passport-steam');
const SteamStrategy = passportSteam.Strategy;
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const { Session, sequelizeSteam } = require('./config/db');
const { Op } = require('sequelize');
const cookieParser = require('cookie-parser');
const nodemailer = require('nodemailer')
dotenv.config()

const ip = 'http://localhost:';
const port = 4050;

// STEAM

// DESTROY SESSION
// Session.destroy({ where: {} })
//   .then(() => {
//     console.log('Toutes les sessions ont été supprimées.');
//   })
//   .catch((err) => {
//     console.error('Erreur lors de la suppression des sessions :', err);
//   });

// Required to get data from user for sessions
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});
// Initiate Strategy
passport.use(new SteamStrategy({
  returnURL: ip + port + '/api/auth/steam/return',
  realm: ip + port + '/',
  apiKey: '34C8F7FE766FED51D50376957154AFC2'
}, function (identifier, profile, done) {
  process.nextTick(function () {
    profile.identifier = identifier;
    return done(null, profile);
  });
}
));

const sessionStore = new SequelizeStore({
  db: sequelizeSteam,
  table: 'sessions',
  expiration: 30000 // durée de vie des sessions en millisecondes (ici, 30 secondes)
});

setInterval(() => {
  sessionStore.clearExpiredSessions();
}, 30000);

app.use((req, res, next) => {
  // Vérifiez si la session existe et qu'elle n'est pas expirée
  if (req.session && req.session.expires && req.session.expires > new Date()) {
    // Mettre à jour la propriété expires de la session
    req.session.expires = new Date(Date.now() + (60 * 60 * 1000)); // Durée de vie de la session en millisecondes (1 heure)
  }
  next();
});

// Middleware pour supprimer les sessions expirées de la base de données
app.use((req, res, next) => {
  Session.destroy({
    where: {
      expires: { [Op.lt]: new Date() } // Supprime les sessions dont la date d'expiration est inférieure à la date actuelle
    }
  }).then(() => {
    next();
  }).catch(err => {
    console.error(err);
    next(err);
  });
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:5500");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Credentials', true);
  next();
});

app.use(cookieParser());
app.use(session({
  secret: 'uM7tL0pXeK',
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: 60 * 60 * 1000 // Durée de vie de la session en millisecondes (1 heure)
  },
  store: sessionStore,
}));

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.get('/api/checkSession', (req, res) => {
  if (req.user) {
    res.send('connected');
  } else {
    res.send('not_connected');
  }
});

app.get('/', (req, res) => {
  console.log('GET /');
  res.redirect('/');
});

app.get('/api/auth/steam', passport.authenticate('steam', {failureRedirect: '/'}), function (req, res) {
  console.log('GET /api/auth/steam');
  res.redirect('/');
});

app.get('/api/auth/steam/return', passport.authenticate('steam', {failureRedirect: '/'}), function (req, res) {
  console.log('GET /api/auth/steam/return');
  // Redirect is found user
  if (req.user) {
    console.log('User authenticated:', req.user);
    res.redirect('http://localhost:5500/');
  }
});

app.get('/api/user', (req, res) => {
  const user = req.user; // Récupération de l'utilisateur connecté
  if (user) {
    res.json(user);
  } else {
    res.status(401).json({ message: 'User not authenticated' });
  }
});


app.get('/api/userinfo', (req, res) => {
  if (req.isAuthenticated()) {
    // L'utilisateur est authentifié
    const { id, displayName, _json } = req.user;
    const avatarfull = _json.avatarfull;
    const userInfo = { steamid: id, personaname: displayName, avatarfull: avatarfull };
    console.log('User authenticated:', userInfo);
    res.send(userInfo);    
  } else {
    // L'utilisateur n'est pas authentifié
    console.log('User not authenticated');
    res.sendStatus(401);
  }
});

app.get('/api/logout', function(req, res){
  req.session.destroy(function(err) {
    if (err) { return next(err); }
    // redirection vers la page d'accueil, par exemple
    res.send('deconnecté')
  });
});

// import routes
const serveurRoutes = require('./routes/serveur');
const statsFfaRoutes = require('./routes/statsFFA');
const statsRetakeRoutes = require('./routes/statsRETAKE')
const statsHsmodRoutes = require('./routes/statsHSMOD')

// cors

// Autoriser les requêtes provenant de http://localhost:5500
const corsOptions = {
  origin: 'http://localhost:5500',
  optionsSuccessStatus: 200,
  methods: 'GET, POST, PUT, DELETE',
  allowedHeaders: 'Content-Type, Authorization',
  credentials: true // Autoriser l'envoi de cookies
};

// Activer le middleware CORS
app.use(cors(corsOptions));


// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routes
app.use('/api/serveur', serveurRoutes);
app.use('/api/statsFFA', statsFfaRoutes)
app.use('/api/statsRETAKE', statsRetakeRoutes)
app.use('/api/statsHSMOD', statsHsmodRoutes)

// static files
app.use(express.static(__dirname + '/public'));


// nodemailer
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'sebastienlfv.pro@gmail.com',
    pass: process.env.EMAIL_PASS
  }
})

app.post('/api/send-mail', function(req, res) {
  var pseudo = req.body.pseudo
  var pseudo2 = req.body.pseudo2
  var email = req.body.email
  var email2 = req.body.email2
  var steamLink = req.body.steamLink
  var explication = req.body.explication
  var name = req.body.name
  var birthday = req.body.birthday
  var explainModo = req.body.explainModo
  var expStaff = req.body.expStaff
  var mailOptions = {
    from: 'sebastienlfv.pro@gmail.com',
    to: 'sebastienlfv.pro@gmail.com',
    subject: 'Formulaire de contact / signalement - CSGO NOLIFE' + ' - ' + pseudo + pseudo2,
    html: `<h1 style="font-size: 25px; color: #000">Formulaire de contact / signalement - CSGO NOLIFE - ${pseudo || pseudo2}</h1> </br> 
    <p style="font-weight: bold; margin-top: 20px">email : <span style="font-weight: normal">${email || email2}</span></p> </br>
    <p style="font-weight: bold; margin-top: 20px">Nom : <span style="font-weight: normal">${name}</span></p> </br>
    <p style="font-weight: bold; margin-top: 10px">Profile steam de la personne report : <span style="font-weight: normal">${steamLink}</span></p> </br>
    <p style="font-weight: bold; margin-top: 20px">Explication du problème : <span style="font-weight: normal">${explication}</span></p> </br>
    <p style="font-weight: bold; margin-top: 20px">Motivation du modérateur : <span style="font-weight: normal">${explainModo}</span></p> </br>
    <p style="font-weight: bold; margin-top: 20px">Expérience staff : <span style="font-weight: normal">${expStaff}</span></p> </br>
    <p style="font-weight: bold; margin-top: 20px">Date de naissance : <span style="font-weight: normal">${birthday}</span></p> </br>`
  }

  transporter.sendMail(mailOptions, function(err, info) {
    if(err) {
      console.log(err);
    } else {
      console.log('Email envoyé : ' + info.response);
    }
  })
})

module.exports = app;