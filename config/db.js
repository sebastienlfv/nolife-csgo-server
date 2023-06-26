const Sequelize = require('sequelize');

// Base de données steam connect
const sequelizeSteam = new Sequelize('session_nolifecsgo', 'root', 'root', {
  host: '149.202.87.104',
  dialect: 'mysql'
});

sequelizeSteam.authenticate()
  .then(() => {
    console.log("Connexion à la BDD STEAM MySQL réussie");
  }).catch(() => {
    console.log("Connexion à la BDD STEAM MySQL échouée");
  });

sequelizeSteam.sync().then(() => {
  console.log('Les modèles ont été synchronisés avec la base de données steam');
}).catch((err) => {
  console.log('Une erreur est survenue lors de la synchronisation des modèles avec la base de données steam', err);
});

const Session = sequelizeSteam.define('sessions', {
  sid: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  expires: Sequelize.DATE,
  data: Sequelize.TEXT,
});


// base de données csgo_ffa
const sequelizeCsgoFfa = new Sequelize('csgo_stats_ffa', 'root', 'root', {
  host: '149.202.87.104',
  dialect: 'mysql'
});

sequelizeCsgoFfa.authenticate()
  .then(() => {
    console.log("Connexion à la BDD FFA MySQL réussie");
  }).catch(() => {
  console.log("Connexion à la BDD FFA MySQL échouée");
});

sequelizeCsgoFfa.sync().then(() => {
  console.log('Les modèles ont été synchronisés avec la base de données serveurs FFA');
}).catch((err) => {
  console.log('Une erreur est survenue lors de la synchronisation des modèles avec la base de données serveurs FFA', err);
});

// base de données csgo_retake
const sequelizeCsgoRetake = new Sequelize('csgo_stats_retake', 'root', 'root', {
  host: '149.202.87.104',
  dialect: 'mysql'
});

sequelizeCsgoFfa.authenticate()
  .then(() => {
    console.log("Connexion à la BDD RETAKE MySQL réussie");
  }).catch(() => {
  console.log("Connexion à la BDD RETAKE MySQL échouée");
});

sequelizeCsgoFfa.sync().then(() => {
  console.log('Les modèles ont été synchronisés avec la base de données serveurs RETAKE');
}).catch((err) => {
  console.log('Une erreur est survenue lors de la synchronisation des modèles avec la base de données serveurs RETAKE', err);
});

// base de données csgo_hsmod
const sequelizeCsgoHsmod = new Sequelize('csgo_stats_hsmod', 'root', 'root', {
  host: '149.202.87.104',
  dialect: 'mysql'
});

sequelizeCsgoFfa.authenticate()
  .then(() => {
    console.log("Connexion à la BDD HSMOD MySQL réussie");
  }).catch(() => {
  console.log("Connexion à la BDD HSMOD MySQL échouée");
});

sequelizeCsgoFfa.sync().then(() => {
  console.log('Les modèles ont été synchronisés avec la base de données serveurs HSMOD');
}).catch((err) => {
  console.log('Une erreur est survenue lors de la synchronisation des modèles avec la base de données serveurs HSMOD', err);
});

module.exports = { Session, sequelizeSteam, sequelizeCsgoFfa, sequelizeCsgoRetake, sequelizeCsgoHsmod };
