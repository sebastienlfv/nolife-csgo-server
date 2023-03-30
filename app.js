const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const cors = require('cors')
const app = express()
const passport = require('passport');
const passportSteam = require('passport-steam');
const SteamStrategy = passportSteam.Strategy;
const port = 4050
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const { Session, sequelize } = require('./config/db');
const { Op } = require('sequelize');
dotenv.config()

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
  returnURL: 'http://localhost:' + port + '/api/auth/steam/return',
  realm: 'http://localhost:' + port + '/',
  apiKey: 'B2E6B6ED2E3519954148F6C71B2B3A73'
}, function (identifier, profile, done) {
  process.nextTick(function () {
    profile.identifier = identifier;
    return done(null, profile);
  });
}
));

const sessionStore = new SequelizeStore({
  db: sequelize,
  table: 'sessions',
  expiration: 30000 // durée de vie des sessions en millisecondes (ici, 30 secondes)
});

setInterval(() => {
  sessionStore.clearExpiredSessions();
}, 30000);

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

app.use(session({
  secret: 'uM7tL0pXeK',
  saveUninitialized: true,
  resave: false,
  cookie: {
    maxAge: 30000 // Durée de vie de la session en millisecondes (30 secondes)
  },
  store: sessionStore,
}));

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.get('/', (req, res) => {
  res.redirect('/');
});
app.get('/api/auth/steam', passport.authenticate('steam', {failureRedirect: '/'}), function (req, res) {
  res.redirect('/')
});
app.get('/api/auth/steam/return', passport.authenticate('steam', {failureRedirect: '/'}), function (req, res) {
  // Redirect is found user
  if (req.user) {
    res.redirect('http://localhost:5500/index.html');
    console.log('info', req.user);
  }
});

app.get('/api/userinfo', (req, res) => {
  if (req.isAuthenticated()) {
    // L'utilisateur est authentifié
    const { id, displayName, _json } = req.user;
    const avatarfull = _json.avatarfull;
    const userInfo = { steamid: id, personaname: displayName, avatarfull: avatarfull };
    res.send(userInfo);    
  } else {
    // L'utilisateur n'est pas authentifié
    res.sendStatus(401);
  }
});

// import routes
const serveurRoutes = require('./routes/serveur')

// cors
// autoriser les requêtes provenant de http://localhost:5500
app.use(cors({
  origin: 'http://localhost:5500'
}));


// middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// routes
app.use('/api/serveur', serveurRoutes)

// static files
app.use(express.static(__dirname + '/public'))

module.exports = app;