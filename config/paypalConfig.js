// paypalConfig.js
const paypal = require('@paypal/checkout-server-sdk');

let environment = new paypal.core.SandboxEnvironment('ARGlN1hOoeygI_pC1KqjYIL01RnTyLnJ9UO6JfdhNHOZ7SQhihL2ipk4yC0qUstW-7-ZG80sJSXH1ERn', 'EKgKffILs0BuCdWAqIxqeMSw2zPy8FUvknBmcXUjsZc8vX41-AweFOc19CrtkU8hSGD0jmN9JSADPlFY');
let client = new paypal.core.PayPalHttpClient(environment);

module.exports = client;