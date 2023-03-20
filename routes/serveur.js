const express = require('express')
const router = express.Router()
const serveurCtrl = require('../controllers/serveurs')

// Route retake serveurs

router.get('/InfoRetake1', serveurCtrl.getInfoRetake1)
router.get('/PlayerRetake1', serveurCtrl.getPlayerRetake1)

router.get('/InfoRetake2', serveurCtrl.getInfoRetake2)
router.get('/PlayerRetake2', serveurCtrl.getPlayerRetake2)

router.get('/InfoRetake3', serveurCtrl.getInfoRetake3)
router.get('/PlayerRetake3', serveurCtrl.getPlayerRetake3)

router.get('/InfoRetake4', serveurCtrl.getInfoRetake4)
router.get('/PlayerRetake4', serveurCtrl.getPlayerRetake4)

router.get('/InfoRetake5', serveurCtrl.getInfoRetake5)
router.get('/PlayerRetake5', serveurCtrl.getPlayerRetake5)



// Route ffa serveurs

router.get('/InfoFfa1', serveurCtrl.getInfoFfa1)
router.get('/PlayerFfa1', serveurCtrl.getPlayerFfa1)

router.get('/InfoFfa2', serveurCtrl.getInfoFfa2)
router.get('/PlayerFfa2', serveurCtrl.getPlayerFfa2)

router.get('/InfoFfa3', serveurCtrl.getInfoFfa3)
router.get('/PlayerFfa3', serveurCtrl.getPlayerFfa3)

// Route hsmod serveurs

router.get('/InfoHsMod1', serveurCtrl.getInfoHsMod1)
router.get('/PlayerHsMod1', serveurCtrl.getPlayerHsMod1)

router.get('/InfoHsMod2', serveurCtrl.getInfoHsMod2)
router.get('/PlayerHsMod2', serveurCtrl.getPlayerHsMod2)


module.exports = router