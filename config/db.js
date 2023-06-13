const Sequelize = require('sequelize');

// Base de données existante
const sequelizeSteam = new Sequelize('session_nolifecsgo', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql'
});

sequelizeSteam.authenticate()
  .then(() => {
    console.log("Connexion à la BDD MySQL existante réussie");
  }).catch(() => {
    console.log("Connexion à la BDD MySQL existante échouée");
  });

sequelizeSteam.sync().then(() => {
  console.log('Les modèles ont été synchronisés avec la base de données existante');
}).catch((err) => {
  console.log('Une erreur est survenue lors de la synchronisation des modèles avec la base de données existante', err);
});


// base de données csgo_ffa
const sequelizeCsgoFfa = new Sequelize('csgo_stats_ffa', 'root', 'root', {
  host: '149.202.87.104',
  dialect: 'mysql'
});

sequelizeCsgoFfa.authenticate()
  .then(() => {
    console.log("Connexion à la nouvelle BDD MySQL réussie");
  }).catch(() => {
  console.log("Connexion à la nouvelle BDD MySQL échouée");
});

sequelizeCsgoFfa.sync().then(() => {
  console.log('Les modèles ont été synchronisés avec la nouvelle base de données');
}).catch((err) => {
  console.log('Une erreur est survenue lors de la synchronisation des modèles avec la nouvelle base de données', err);
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
