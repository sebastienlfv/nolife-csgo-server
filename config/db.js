const Sequelize = require('sequelize');

const sequelize = new Sequelize('session_nolifecsgo', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql'
});

sequelize.authenticate()
  .then(() => {
    console.log("Connexion à la BDD MYSQL");
  }).catch(() => {
  console.log("Connexion à la BDD MYSQL raté");
})

sequelize.sync().then(() => {
  console.log('Les modèles ont été synchronisés avec la base de données');
}).catch((err) => {
  console.log('Une erreur est survenue lors de la synchronisation des modèles avec la base de données', err);
});


const Session = sequelize.define('sessions', {
  sid: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  expires: Sequelize.DATE,
  data: Sequelize.TEXT,
});

module.exports = { Session, sequelize };