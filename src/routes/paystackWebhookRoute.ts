import express from 'express';
import { verifyPayment } from '../middlewares/verifyPaystackPayment';

const webhookRouter = express.Router();

//@desc verify paystack payment
// and allocate room to student
//@route POST /api/paystack-webhook
webhookRouter.post('/paystack-webhook', verifyPayment);

export default webhookRouter;
