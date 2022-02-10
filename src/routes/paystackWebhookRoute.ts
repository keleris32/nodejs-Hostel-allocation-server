import express from 'express';
import { allocateRoomController } from '../controllers/rooms/allocateRoomController';
import { verifyPayment } from '../middlewares/verifyPaystackPayment';

const webhookRouter = express.Router();

//@desc verify paystack payment
// and allocate room to student
//@route POST /api/paystack-webhook
webhookRouter.post('/paystack-webhook', verifyPayment, allocateRoomController);

export default webhookRouter;
