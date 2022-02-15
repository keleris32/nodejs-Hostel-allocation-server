'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.verifyPayment = void 0;
const crypto_1 = __importDefault(require('crypto'));
const errorResponse_1 = require('../utils/errorResponse');
const successResponse_1 = require('../utils/successResponse');
const dbConnector_1 = __importDefault(require('../config/dbConnector'));

const allocateRoomController = async (metadata, res) => {
  try {
    const room_id = metadata.room_id;
    const student_id = metadata.student_id;
    await dbConnector_1.default.query(
      'UPDATE students SET room_id = $1 WHERE id = $2',
      [room_id, student_id]
    );

    res.sendStatus(200);
  } catch (error) {
    console.log('Errrrrrrrrr', error.response);
  }
};

const verifyPayment = async (req, res) => {
  try {
    const secret = process.env.PAYSTACK_SECRET_KEY;
    const hash = crypto_1.default
      .createHmac('sha512', secret)
      .update(JSON.stringify(req.body))
      .digest('hex');
    if (hash === req.headers['x-paystack-signature']) {
      const event = req.body;
      if (event.data.status === 'success') {
        // Call fn to allocate room on success
        allocateRoomController(event.data.metadata, res);
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
exports.verifyPayment = verifyPayment;
//# sourceMappingURL=verifyPaystackPayment.js.map
