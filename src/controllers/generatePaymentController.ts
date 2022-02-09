import { Request, Response } from 'express';
import axios from 'axios';
import { errorResponseBody } from '../utils/errorResponse';

export const generatePaystackPaymentIntent = async (
  req: Request,
  res: Response
) => {
  try {
    const { email, amount, student_id, room_id } = req.body;

    if (!email || !amount || !student_id || !room_id) {
      throw new Error('Provide valid credentials!');
    }

    const convertFromKoboToNaira = amount * 100;

    const requestBody = {
      key: process.env.PAYSTACK_PUBLIC_KEY,
      amount: convertFromKoboToNaira,
      email: email,
      metadata: {
        student_id: student_id,
        room_id: room_id,
      },
    };

    const requestHeader = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      },
    };

    const response = await axios.post(
      'https://api.paystack.co/transaction/initialize',
      requestBody,
      requestHeader
    );

    res.status(200).json(response.data);
  } catch (error) {
    if (error.message) {
      res.status(400).json(errorResponseBody(error.message));
    } else {
      res.status(500).json(errorResponseBody('Internal Server Error'));
    }
  }
};
