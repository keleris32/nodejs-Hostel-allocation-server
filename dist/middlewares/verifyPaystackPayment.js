"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPayment = void 0;
const crypto_1 = __importDefault(require("crypto"));
const verifyPayment = (req, res, _next) => {
    try {
        const secret = process.env.PAYSTACK_SECRET_KEY;
        const hash = crypto_1.default
            .createHmac('sha512', secret)
            .update(JSON.stringify(req.body))
            .digest('hex');
        if (hash === req.headers['x-paystack-signature']) {
            const event = req.body;
            console.log('Event >>>>', event);
            res.sendStatus(200);
        }
        else {
            throw new Error('An Error occured while verifying events');
        }
    }
    catch (error) {
        res.sendStatus(500);
    }
};
exports.verifyPayment = verifyPayment;
//# sourceMappingURL=verifyPaystackPayment.js.map