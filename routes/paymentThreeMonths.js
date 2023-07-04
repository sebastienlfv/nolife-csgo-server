// routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const paymentThreeMonthsCtrl = require('../controllers/paymentThreeMonths');

router.get('/start-payment', paymentThreeMonthsCtrl.startPayment);
router.get('/paypal-return', paymentThreeMonthsCtrl.handleReturn);
router.get('/paypal-cancel', paymentThreeMonthsCtrl.handleCancel);
router.get('/confirm-payment', paymentThreeMonthsCtrl.confirmPayment);

module.exports = router;