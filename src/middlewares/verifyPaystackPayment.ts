import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';

export const verifyPayment = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const secret: any = process.env.PAYSTACK_SECRET_KEY;
    const hash = crypto
      .createHmac('sha512', secret)
      .update(JSON.stringify(req.body))
      .digest('hex');

    if (hash === req.headers['x-paystack-signature']) {
      const event = req.body;
      if (event.data.status === 'success') {
        // Means the transaction was successful

        // If Successful then let req.user be equal to the metadata sent by paystack
        req.user = event.data.metadata;

        next();
      } else {
        res.sendStatus(500);
      }
    } else {
      throw new Error('An Error occured while verifying events');
    }
  } catch (error) {
    res.sendStatus(500);
  }
};
