const express = require('express')
const router = express.Router()
const statsFFACtrl = require('../controllers/statsFFA')

// route stats serveur ffa

router.get('/Players', statsFFACtrl);

module.exports = router;
