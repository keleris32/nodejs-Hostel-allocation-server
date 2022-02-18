'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.allocateRoomController = void 0;
const errorResponse_1 = require('../../utils/errorResponse');
const successResponse_1 = require('../../utils/successResponse');
const dbConnector_1 = __importDefault(require('../../config/dbConnector'));
const allocateRoomController = async (req, res) => {
  try {
    // const room_id = req.user.room_id;
    // const matricNumber = req.user.matricNumber;
    const room_id = res.locals.roomId;
    const student_id = res.locals.studentId;

    console.log('localsZZZ', room_id);
    await dbConnector_1.default.query(
      'UPDATE students SET room_id = $1 WHERE id = $2',
      [room_id, student_id]
    );
    // const responseMessage = 'Room allocated successfully!';
    // const responseData = {};
    // res.status(201).json((0, successResponse_1.successResponseBody)(responseMessage, responseData));
  } catch (error) {
    // res.status(500).json((0, errorResponse_1.errorResponseBody)('Internal Server Error!'));
    console.log('Erro Allo >>>', JSON.stringify(error, null, 2));
  }
};
exports.allocateRoomController = allocateRoomController;
//# sourceMappingURL=allocateRoomController.js.map
