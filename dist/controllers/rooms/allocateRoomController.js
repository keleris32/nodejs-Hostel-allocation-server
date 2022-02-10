"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.allocateRoomController = void 0;
const errorResponse_1 = require("../../utils/errorResponse");
const successResponse_1 = require("../../utils/successResponse");
const dbConnector_1 = __importDefault(require("../../config/dbConnector"));
const jsonwebtoken_1 = require("jsonwebtoken");
const allocateRoomController = async (req, res) => {
    try {
        const room_id = req.user.room_id;
        const refreshToken = req.cookies.CEU;
        let payload = null;
        payload = (0, jsonwebtoken_1.verify)(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        if (!room_id)
            throw new Error('Provide required credential before proceeding!');
        await dbConnector_1.default.query('UPDATE students SET room_id = $1 WHERE matric_no = $2', [
            room_id,
            payload.matricNumber,
        ]);
        const responseMessage = 'Room allocated successfully!';
        const responseData = {};
        res.status(201).json((0, successResponse_1.successResponseBody)(responseMessage, responseData));
    }
    catch (error) {
        if (error.message === 'Provide required credentials before proceeding!') {
            res.status(400).json((0, errorResponse_1.errorResponseBody)(error.message));
        }
        else {
            res.status(500).json((0, errorResponse_1.errorResponseBody)('Internal Server Error!'));
        }
    }
};
exports.allocateRoomController = allocateRoomController;
//# sourceMappingURL=allocateRoomController.js.map