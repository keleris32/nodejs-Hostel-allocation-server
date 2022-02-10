"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshAccessToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const createToken_1 = require("../middlewares/createToken");
const sendRefreshToken_1 = require("../middlewares/sendRefreshToken");
const dbConnector_1 = __importDefault(require("../config/dbConnector"));
const refreshAccessToken = async (req, res) => {
    const refreshToken = req.cookies.CEU;
    if (!refreshToken) {
        return res.send({ ok: false, access_token: '' });
    }
    let payload = null;
    try {
        payload = (0, jsonwebtoken_1.verify)(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    }
    catch (error) {
        return res.send({ ok: false, access_token: '' });
    }
    const student = await dbConnector_1.default.query('SELECT * FROM students WHERE id = $1', [
        payload.matricNumber,
    ]);
    if (!student) {
        return res.send({ ok: false, access_token: '' });
    }
    (0, sendRefreshToken_1.SendRefreshToken)(res, (0, createToken_1.CreateRefreshToken)(student.rows[0].matric_no));
    return res.send({
        ok: true,
        access_token: (0, createToken_1.CreateAccessToken)(student.rows[0].matric_no, student.rows[0].gender),
    });
};
exports.refreshAccessToken = refreshAccessToken;
//# sourceMappingURL=refreshTokenController.js.map