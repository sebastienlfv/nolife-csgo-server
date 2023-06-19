const express = require('express')
const router = express.Router()
const statsFFACtrl = require('../controllers/statsFFA');

// route stats serveur ffa

router.get('/Players', statsFFACtrl.getPlayers);
router.get('/Players_stats', statsFFACtrl.getPlayersStats);

module.exports = router;
