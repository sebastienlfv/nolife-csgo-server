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
router.get('/Players', async (req, res) => {
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
});

// Exporter le router
module.exports = router;
