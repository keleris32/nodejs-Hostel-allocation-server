'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.getStudent = void 0;
const pool = require('../config/dbConnector');
const errorResponse_1 = require('../utils/errorResponse');
const successResponse_1 = require('../utils/successResponse');
const dbConnector_1 = __importDefault(require('../config/dbConnector'));
const getStudent = async (req, res) => {
  try {
    const { id } = req.body;
    const student = await dbConnector_1.default.query('SELECT * FROM students');
    const responseMessage = 'Student data fetched successfully!';
    if (student.rowCount !== 0) {
      if (student.rows[0].room_id !== null) {
        let studentWithRoom = await dbConnector_1.default.query(
          'SELECT students.*, rooms.hostel, rooms.room_type, rooms.room_number, rooms.price, rooms.no_of_inhabitants, rooms.type_of_hostel FROM students INNER JOIN rooms ON students.room_id = rooms.id WHERE id = $1',
          [id]
        );

        res
          .status(200)
          .json(
            (0, successResponse_1.successResponseBody)(
              responseMessage,
              studentWithRoom.rows[0]
            )
          );
      } else {
        res
          .status(200)
          .json(
            (0, successResponse_1.successResponseBody)(
              responseMessage,
              student.rows[0]
            )
          );
      }
    } else {
      throw new Error('Could not fetch student data!');
    }
  } catch (error) {
    res
      .status(500)
      .send((0, errorResponse_1.errorResponseBody)('Internal Server Error!'));
  }
};
exports.getStudent = getStudent;
//# sourceMappingURL=getStudentController.js.map
