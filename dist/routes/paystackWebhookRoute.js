"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const verifyPaystackPayment_1 = require("../middlewares/verifyPaystackPayment");
const webhookRouter = express_1.default.Router();
webhookRouter.post('/paystack-webhook', verifyPaystackPayment_1.verifyPayment);
exports.default = webhookRouter;
//# sourceMappingURL=paystackWebhookRoute.js.map