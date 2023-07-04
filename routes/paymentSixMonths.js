// routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const paymentSixMonthsCtrl = require('../controllers/paymentSixMonths');

router.get('/start-payment', paymentSixMonthsCtrl.startPayment);
router.get('/paypal-return', paymentSixMonthsCtrl.handleReturn);
router.get('/paypal-cancel', paymentSixMonthsCtrl.handleCancel);
router.get('/confirm-payment', paymentSixMonthsCtrl.confirmPayment);

module.exports = router;