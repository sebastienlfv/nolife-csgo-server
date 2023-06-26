const express = require('express')
const router = express.Router()
const statsRETAKECtrl = require('../controllers/statsRETAKE');

// route stats serveur ffa

router.get('/Players', statsRETAKECtrl.getPlayers);
router.get('/Players_stats', statsRETAKECtrl.getPlayersStats);
router.get('/Weapons_player_stats', statsRETAKECtrl.getWeaponPlayerStats)

module.exports = router;
