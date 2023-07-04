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
    // Vérifiez si l'utilisateur est défini
    if (!req.user || !req.user._json || !req.user._json.steamid) {
        return res.status(400).json({ message: 'User information is required' });
    }

    const steamID = req.user._json.steamid;

    // Vérifiez si le steamID existe déjà
    const result = await sequelizeCsgoVip.query(
        'SELECT * FROM  vips WHERE steamID = ?',
        { replacements: [steamID], type: sequelizeCsgoVip.QueryTypes.SELECT }
    );

    if (result.length > 0) {
        return res.status(403).json({ message: 'User already has a VIP status' });
    }

    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");
    request.requestBody({
        intent: 'CAPTURE',
        purchase_units: [{
            amount: {
                currency_code: 'EUR',
                value: '14.99'
            },
            description: 'VIP 3 MOUTHS ORDER'
        }],
        application_context: {
            return_url: 'http://localhost:4050/api/paymentThreeMonths/paypal-return',
            cancel_url: 'http://localhost:4050/api/paymentThreeMonths/paypal-cancel',
        }
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
    const token = req.query.token;
    const request = new paypal.orders.OrdersGetRequest(token);
    const order = await paypalClient.execute(request);

    if (order.result.status === 'APPROVED') {
        // Create and execute capture request
        const captureRequest = new paypal.orders.OrdersCaptureRequest(token);
        const captureOrder = await paypalClient.execute(captureRequest);

        if (captureOrder.result.status === 'COMPLETED') {
            // Redirect to confirmation
            res.redirect(`/api/paymentThreeMonths/confirm-payment?token=${token}`);
        } else {
            console.log(`Order status is ${captureOrder.result.status}, redirecting to cancel`);
            res.redirect(`/api/paymentThreeMonths/paypal-cancel?token=${token}`);
        }
    } else if (order.result.status === 'CREATED') {
        // The payment has not been approved yet, redirect to confirmation
        res.redirect(`/api/paymentThreeMonths/confirm-payment?token=${token}`);
    } else {
        console.log(`Order status is ${order.result.status}, redirecting to cancel`);
        res.redirect(`/api/paymentThreeMonths/paypal-cancel?token=${token}`);
    }
}];


exports.handleCancel = [isAuthenticated, async (req, res) => {
    // Vérifiez si token est défini
    if (!req.query.token) {
        return res.status(400).json({ message: 'token is required' });
    }
    // Informez l'utilisateur que le paiement a été annulé
    res.redirect('http://localhost:5500/client/handleCancel.html');
    console.log({ message: 'Votre paiement a été annulé.' });
}];

exports.confirmPayment = [isAuthenticated, async (req, res) => {
    // Vérifiez si token est défini
    if (!req.query.token) {
        return res.status(400).json({ message: 'token is required' });
    }

    const tokenId = req.query.token;
    const request = new paypal.orders.OrdersGetRequest(tokenId);
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
            const dateNow = new Date();
            const result = await sequelizeCsgoVip.query(
                'INSERT INTO vips (steamID, uniqueCode, Formule, purchaseDate) VALUES (?, ?, ?, ?)',
                { replacements: [steamID, uniqueCode, '3 months', dateNow] } 
            )

            console.log('SteamID and unique code saved in the database');
        } catch (error) {
            console.error('Error saving steamID and unique code in the database: ', error);
        }

        // res.json({ message: 'Payment confirmed', code: uniqueCode })
        res.redirect('http://localhost:5500/client/confirmPayment.html');
    } else {
        console.log(`Order status is ${order.result.status}, redirecting to cancel`);
        res.redirect(`/api/paymentThreeMonths/paypal-cancel?token=${tokenId}`);
    }
}];
