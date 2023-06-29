const paypal = require('@paypal/checkout-server-sdk');
const paypalClient = require('../config/paypalConfig');
const { sequelizeCsgoVip } = require('../config/db')
const uuid = require('uuid');

const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) { 
        next();
    } else {
        res.status(401).json({ message: 'Vous devez être connecté pour effectuer cette action' });
    }
};

exports.startPayment = [isAuthenticated, async (req, res) => {
    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");
    request.requestBody({
        intent: 'CAPTURE',
        purchase_units: [{
            amount: {
                currency_code: 'EUR',
                value: '5.00'
            },
            description: 'VIP ORDER'
        }]
    });

    let order;
    try {
        order = await paypalClient.execute(request);
        console.log('order', order);
    } catch (err) {
        // Handle any errors from the call
        console.error(err);
        return res.send(500);
    }

    const approvalUrl = order.result.links.find(link => link.rel === 'approve').href;
    res.redirect(approvalUrl);
}];

exports.handleReturn = [isAuthenticated, async (req, res) => {
    const orderId = req.query.orderId;
    const request = new paypal.orders.OrdersGetRequest(orderId);
    const order = await paypalClient.execute(request);

    if (order.result.status === 'CREATED' || order.result.status === 'APPROVED') {
        // Redirigez l'utilisateur vers la route confirmPayment
        res.redirect(`/confirmPayment?orderId=${orderId}`);
    } else {
        // Redirigez l'utilisateur vers la route handleCancel
        res.redirect('/handleCancel');
    }
}];
exports.handleCancel = [isAuthenticated, async (req, res) => {
    // Vérifiez si orderId est défini
    if (!req.query.orderId) {
        return res.status(400).json({ message: 'orderId is required' });
    }
    // Informez l'utilisateur que le paiement a été annulé
    res.json({ message: 'Votre paiement a été annulé.' });
}];

exports.confirmPayment = [isAuthenticated, async (req, res) => {
    // Vérifiez si orderId est défini
    if (!req.query.orderId) {
        return res.status(400).json({ message: 'orderId is required' });
    }

    const orderId = req.query.orderId;
    const request = new paypal.orders.OrdersGetRequest(orderId);
    const order = await paypalClient.execute(request);

    if (order.result.status === 'COMPLETED') {
        // Vérifiez si l'utilisateur est défini
        if (!req.user || !req.user._json || !req.user._json.steamid) {
            return res.status(400).json({ message: 'User information is required' });
        }

        // Générez le code unique
        const uniqueCode = uuid.v4();

        // Récupérez le steamID de l'utilisateur
        const steamID = req.user._json.steamid;

        // Enregistrez le steamID et le code unique
        try {
            const result = await sequelizeCsgoVip.query(
                'INSERT INTO VIPS (steamID, uniqueCode) VALUES (?, ?)',
                { replacements: [steamID, uniqueCode] } 
            )
            console.log('SteamID and unique code saved in the database');
        } catch (error) {
            console.error('Error saving steamID and unique code in the database: ', error);
        }

        res.json({ message: 'Payment confirmed', code: uniqueCode });
    } else {
        // Redirigez l'utilisateur vers la route handleCancel
        res.redirect('/handleCancel');
    }
}];