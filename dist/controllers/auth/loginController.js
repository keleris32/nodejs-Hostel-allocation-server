"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginStudent = void 0;
const bcryptjs_1 = require("bcryptjs");
const createToken_1 = require("../../middlewares/createToken");
const sendRefreshToken_1 = require("../../middlewares/sendRefreshToken");
const successResponse_1 = require("../../utils/successResponse");
const errorResponse_1 = require("../../utils/errorResponse");
const dbConnector_1 = __importDefault(require("../../config/dbConnector"));
const loginStudent = async (req, res) => {
    const { matric_no, password } = req.body;
    try {
        const student = await dbConnector_1.default.query('SELECT id, room_id, name, gender, level, course, matric_no, password, gender FROM students WHERE matric_no = $1', [matric_no]);
        if (student.rowCount === 0) {
            throw new Error('No Student found with this credentials!');
        }
        const isPasswordValid = await (0, bcryptjs_1.compare)(password, student.rows[0].password);
        if (!isPasswordValid) {
            throw new Error('Invalid credentials provided!');
        }
        (0, sendRefreshToken_1.SendRefreshToken)(res, (0, createToken_1.CreateRefreshToken)(matric_no));
        if (student.rows[0].room_id === null) {
            const responseBody = {
                id: student.rows[0].id,
                room_id: student.rows[0].room_id,
                name: student.rows[0].name,
                level: student.rows[0].level,
                course: student.rows[0].course,
                matric_no: student.rows[0].matric_no,
                gender: student.rows[0].gender,
                access_token: (0, createToken_1.CreateAccessToken)(matric_no, student.rows[0].gender),
            };
            res.status(201).json(responseBody);
        }
        else {
            const room = await dbConnector_1.default.query('SELECT rooms.id, rooms.hostel, rooms.room_type, rooms.room_number, rooms.price, rooms.no_of_inhabitants, rooms.type_of_hostel FROM students INNER JOIN rooms ON students.room_id = rooms.id WHERE students.id = $1', [student.rows[0].id]);
            const responseBody = {
                id: student.rows[0].id,
                room_id: student.rows[0].room_id,
                name: student.rows[0].name,
                level: student.rows[0].level,
                course: student.rows[0].course,
                matric_no: student.rows[0].matric_no,
                gender: student.rows[0].gender,
                access_token: (0, createToken_1.CreateAccessToken)(matric_no, student.rows[0].gender),
                hostel_details: room.rows[0],
            };
            const responseMessage = 'Authentication was successful!';
            res.status(201).json((0, successResponse_1.successResponseBody)(responseMessage, responseBody));
        }
    }
    catch (error) {
        if (error.message) {
            res.status(422).json((0, errorResponse_1.errorResponseBody)(error.message));
        }
        else {
            res.status(500).json((0, errorResponse_1.errorResponseBody)('Internal Server Error'));
        }
    }
};
exports.loginStudent = loginStudent;
//# sourceMappingURL=loginController.js.map