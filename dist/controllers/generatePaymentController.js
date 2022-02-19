'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.generatePaystackPaymentIntent = void 0;
const axios_1 = __importDefault(require('axios'));
const errorResponse_1 = require('../utils/errorResponse');
const generatePaystackPaymentIntent = async (req, res) => {
  try {
    const { email, amount, student_id, room_id } = req.body;
    console.log('student >>>>>', student_id);
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
    const response = await axios_1.default.post(
      'https://api.paystack.co/transaction/initialize',
      requestBody,
      requestHeader
    );
    res.status(200).json(response.data);
  } catch (error) {
    if (error.message) {
      res
        .status(400)
        .json((0, errorResponse_1.errorResponseBody)(error.message));
    } else {
      res
        .status(500)
        .json((0, errorResponse_1.errorResponseBody)('Internal Server Error'));
    }
  }
};
exports.generatePaystackPaymentIntent = generatePaystackPaymentIntent;
//# sourceMappingURL=generatePaymentController.js.map
