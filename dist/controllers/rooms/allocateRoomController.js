'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.allocateRoomController = void 0;
const dbConnector_1 = __importDefault(require('../../config/dbConnector'));
const allocateRoomController = async (req, res) => {
  try {
    const room_id = res.locals.roomId;
    const student_id = res.locals.studentId;

    await dbConnector_1.default.query(
      'UPDATE students SET room_id = $1 WHERE id = $2',
      [room_id, student_id]
    );
  } catch (error) {
    console.log('Erro Allo >>>', JSON.stringify(error, null, 2));
  }
};
exports.allocateRoomController = allocateRoomController;
//# sourceMappingURL=allocateRoomController.js.map
