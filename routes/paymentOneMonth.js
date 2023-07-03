// routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const paymentOneMonthCtrl = require('../controllers/paymentOneMonth');

router.get('/start-payment', paymentOneMonthCtrl.startPayment);
router.get('/paypal-return', paymentOneMonthCtrl.handleReturn);
router.get('/paypal-cancel', paymentOneMonthCtrl.handleCancel);
router.get('/confirm-payment', paymentOneMonthCtrl.confirmPayment);

module.exports = router;