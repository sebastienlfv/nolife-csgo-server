const { Sequelize } = require('sequelize')
const { sequelizeCsgoFfa } = require('../config/db');

const FpsPlayer = sequelizeCsgoFfa.define('fps_players', {
  // Définir les colonnes de la table fps_players
  // Exemple :
  steam_id: {
    type: Sequelize.STRING,
    allowNull: false
  },
  nickname: {
    type: Sequelize.STRING,
    allowNull: false
  },
  account_id: {
    type: Sequelize.STRING,
    allowNull: false
  },
  // ...
}, { timestamps: false });