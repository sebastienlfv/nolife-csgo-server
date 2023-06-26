const express = require('express')
const router = express.Router()
const statsHSMODCtrl = require('../controllers/statsHSMOD');

// route stats serveur ffa

router.get('/Players', statsHSMODCtrl.getPlayers);
router.get('/Players_stats', statsHSMODCtrl.getPlayersStats);
router.get('/Weapons_player_stats', statsHSMODCtrl.getWeaponPlayerStats)

module.exports = router;
