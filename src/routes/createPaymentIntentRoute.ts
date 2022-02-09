import express from 'express';
import { generatePaystackPaymentIntent } from '../controllers/generatePaymentController';
import { isAuth } from '../middlewares/auth';

const paymentIntentRouter = express.Router();

//@desc generate payment intent
//@route POST /api/create-payment-intent
paymentIntentRouter.post(
  '/create-payment-intent',
  isAuth,
  generatePaystackPaymentIntent
);

export default paymentIntentRouter;
