const Sequelize = require('sequelize');

const sequelize = new Sequelize('session_nolifecsgo', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql'
});

const Session = sequelize.define('session', {
  sid: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  expires: Sequelize.DATE,
  data: Sequelize.TEXT,
});

sequelize.authenticate()
  .then(() => {
    console.log("Connexion à la BDD MYSQL");
  }).catch(() => {
  console.log("Connexion à la BDD MYSQL raté");
})

module.exports = Session;