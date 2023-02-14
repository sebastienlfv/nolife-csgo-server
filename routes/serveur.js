const express = require('express')
const router = express.Router()
const serveurCtrl = require('../controllers/serveurs')

// Route serveur
router.get('/retake1', serveurCtrl.getRetake1)



module.exports = router