const Sequelize = require('sequelize');

// Base de données existante
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


const Session = sequelizeSteam.define('sessions', {
  sid: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  expires: Sequelize.DATE,
  data: Sequelize.TEXT,
});

module.exports = { Session, sequelizeSteam, sequelizeCsgoFfa };
