// routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const paymentCtrl = require('../controllers/payment');

router.get('/start-payment', paymentCtrl.startPayment);
router.get('/paypal-return', paymentCtrl.handleReturn);
router.get('/paypal-cancel', paymentCtrl.handleCancel);
router.get('/confirm-payment', paymentCtrl.confirmPayment);

module.exports = router;