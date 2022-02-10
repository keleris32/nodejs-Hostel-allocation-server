"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const generatePaymentController_1 = require("../controllers/generatePaymentController");
const auth_1 = require("../middlewares/auth");
const paymentIntentRouter = express_1.default.Router();
paymentIntentRouter.post('/create-payment-intent', auth_1.isAuth, generatePaymentController_1.generatePaystackPaymentIntent);
exports.default = paymentIntentRouter;
//# sourceMappingURL=createPaymentIntentRoute.js.map