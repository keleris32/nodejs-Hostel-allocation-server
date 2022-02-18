'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.registerStudent = void 0;
const bcryptjs_1 = require('bcryptjs');
const uuid_1 = require('uuid');
const createToken_1 = require('../../middlewares/createToken');
const sendRefreshToken_1 = require('../../middlewares/sendRefreshToken');
const successResponse_1 = require('../../utils/successResponse');
const errorResponse_1 = require('../../utils/errorResponse');
const dbConnector_1 = __importDefault(require('../../config/dbConnector'));
const registerStudent = async (req, res) => {
  const uuid = (0, uuid_1.v4)();
  console.log('UUID >>>', uuid);
  const { name, level, course, matric_no, password, gender } = req.body;
  try {
    const student = await dbConnector_1.default.query(
      'SELECT matric_no FROM students WHERE matric_no = $1',
      [matric_no]
    );
    if (student.rowCount !== 0) {
      throw new Error('This matric number has been used!');
    }
    const hashedPassword = await (0, bcryptjs_1.hash)(password, 12);
    await dbConnector_1.default.query(
      'INSERT INTO students (id, name, level, course, matric_no, password, gender) VALUES ($1, $2, $3, $4, $5, $6, $7)',
      [uuid, name, level, course, matric_no, hashedPassword, gender]
    );
    (0, sendRefreshToken_1.SendRefreshToken)(
      res,
      (0, createToken_1.CreateRefreshToken)(matric_no)
    );
    const responseBody = {
      name: name,
      level: level,
      course: course,
      matric_no: matric_no,
      gender: gender,
      access_token: (0, createToken_1.CreateAccessToken)(matric_no, gender),
    };
    const responseMessage = 'Registration was successful!';
    res
      .status(201)
      .json(
        (0, successResponse_1.successResponseBody)(
          responseMessage,
          responseBody
        )
      );
  } catch (error) {
    if (error.message === 'This matric number has been used!') {
      res
        .status(400)
        .json((0, errorResponse_1.errorResponseBody)(error.message));
    } else if (error.message.includes('value too long')) {
      res
        .status(422)
        .json(
          (0, errorResponse_1.errorResponseBody)(
            'Invalid credentials provided!'
          )
        );
    } else {
      res
        .status(500)
        .json((0, errorResponse_1.errorResponseBody)('Internal Server Error!'));
    }
  }
};
exports.registerStudent = registerStudent;
//# sourceMappingURL=registerController.js.map
