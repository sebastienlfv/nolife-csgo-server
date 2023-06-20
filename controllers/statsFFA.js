const express = require('express');
const router = express.Router();
const { Sequelize } = require('sequelize')
const { sequelizeCsgoFfa } = require('../config/db');

// Importer le modèle correspondant à la table fps_players
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

// Définir la route pour récupérer les statistiques FFA
module.exports.getPlayers = async (req, res) => {
  try {
    // Récupérer les colonnes "steam_id" et "nickname" de la table fps_players
    const statsFfaPlayers = await FpsPlayer.findAll({
      attributes: ['account_id','steam_id', 'nickname']
    });

    // Envoyer les données en tant que réponse
    res.json(statsFfaPlayers);
  } catch (error) {
    // Gérer les erreurs
    console.error('Erreur lors de la récupération des statistiques FFA:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des statistiques FFA' });
  }
};

const FpsServerStats = sequelizeCsgoFfa.define('fps_servers_stats', {
  // Définir les colonnes de la table fps_servers_stats
  // Exemple :
  account_id: {
    type: Sequelize.STRING,
    allowNull: false
  },
  points: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  rank: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  kills: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  deaths: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  assists: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  round_max_kills: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  round_win: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  round_lose: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  playtime: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  lastconnect: {
    type: Sequelize.DATE,
    allowNull: false
  },
  // ...
}, { timestamps: false });

// Définir la route pour récupérer les statistiques FFA
module.exports.getPlayersStats = async (req, res) => {
  try {
    // Récupérer les colonnes demandées de la table fps_servers_stats
    const statsFfaPlayers = await FpsServerStats.findAll({
      attributes: ['account_id', 'points', 'rank', 'kills', 'deaths', 'assists', 'round_max_kills', 'round_win', 'round_lose', 'playtime', 'lastconnect']
    });

    // Envoyer les données en tant que réponse
    res.json(statsFfaPlayers);
  } catch (error) {
    // Gérer les erreurs
    console.error('Erreur lors de la récupération des statistiques FFA:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des statistiques FFA' });
  }
};

const FpsWeaponPlayerStats = sequelizeCsgoFfa.define('fps_weapons_stats', {
  // Définir les colonnes de la table fps_weapons_stats
  // Exemple :
  account_id: {
    type: Sequelize.STRING,
    allowNull: false
  },
  weapon: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  kills: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  shoots: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  hits_head: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  hits_neck: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  hits_chest: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  hits_stomach: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  hits_left_arm: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  hits_right_arm: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  hits_left_leg: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  hits_right_leg: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  headshots: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  // ...
}, { timestamps: false });

// Définir la route pour récupérer les statistiques FFA
module.exports.getWeaponPlayerStats = async (req, res) => {
  try {
    // Récupérer les colonnes demandées de la table fps_servers_stats
    const statsFfaWeponPlayer = await FpsWeaponPlayerStats.findAll();

    // Envoyer les données en tant que réponse
    res.json(statsFfaWeponPlayer);
  } catch (error) {
    // Gérer les erreurs
    console.error('Erreur lors de la récupération des statistiques FFA:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des statistiques FFA' });
  }
};

