const express = require('express')
const router = express.Router()
const vipsCtrl = require('../controllers/vips')

// route vips

router.get('/getVips', vipsCtrl.getVips)

module.exports = router;