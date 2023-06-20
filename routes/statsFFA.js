const express = require('express')
const router = express.Router()
const statsFFACtrl = require('../controllers/statsFFA');

// route stats serveur ffa

router.get('/Players', statsFFACtrl.getPlayers);
router.get('/Players_stats', statsFFACtrl.getPlayersStats);
router.get('/Weapons_player_stats', statsFFACtrl.getWeaponPlayerStats)

module.exports = router;
