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
const sequelize = require('./config/db');
dotenv.config()

// STEAM

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
});

app.use(session({
  secret: 'uM7tL0pXeK',
  saveUninitialized: true,
  resave: false,
  cookie: {
    maxAge: 3600000
  },
  store: sessionStore,
}));
 app.use(passport.initialize());
 app.use(passport.session());

// Routes
app.get('/', (req, res) => {
  res.send(req.user);
 });
 app.get('/api/auth/steam', passport.authenticate('steam', {failureRedirect: '/'}), function (req, res) {
  res.redirect('/')
 });
 app.get('/api/auth/steam/return', passport.authenticate('steam', {failureRedirect: '/'}), function (req, res) {
  console.log(req.user);
  res.redirect('/')
 });

 app.get('/activ', (req, res) => {
  // Vérifier si une session est active
  if (req.session && req.session.user) {
    // La session est active
    res.send('Session active pour l utilisateur ' + req.session.user);
  } else {
    // La session n'est pas active
    res.send('Aucune session active');
  }
 })

// import routes
const serveurRoutes = require('./routes/serveur')

// cors
app.use(cors())

// middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// routes

app.use('/api/serveur', serveurRoutes)

module.exports = app;