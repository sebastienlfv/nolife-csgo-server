const paypal = require('@paypal/checkout-server-sdk');
const paypalClient = require('../config/paypalConfig');
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
    } catch (err) {
        // Handle any errors from the call
        console.error(err);
        return res.send(500);
    }

    const approvalUrl = order.result.links.find(link => link.rel === 'approve').href;
    res.redirect(approvalUrl);
}];

exports.handleReturn = [isAuthenticated, async (req, res) => {
    // Code pour gérer le retour de PayPal

    res.json('handleReturn')
}];

exports.handleCancel = [isAuthenticated, async (req, res) => {
    // Code pour gérer les annulations

    res.json('handleCancel')
}];

exports.confirmPayment = [isAuthenticated, async (req, res) => {
    const orderId = req.query.orderId;

    // Vérifiez que la transaction a été payée
    const request = new paypal.orders.OrdersGetRequest(orderId);
    const order = await paypalClient.execute(request);

    if (order.result.status === 'COMPLETED') {
        // Générez le code unique
        const uniqueCode = uuid.v4();

        // Récupérez le steamID de l'utilisateur
        const steamID = req.user._json.steamid;

        // Enregistrez le steamID et le code unique
        // Vous devrez remplacer cette partie par votre propre logique pour enregistrer le steamID et le code unique
        // ...

        res.json({ message: 'Payment confirmed', code: uniqueCode });
    } else {
        res.status(400).json({ message: 'Payment not confirmed' });
    }
}];