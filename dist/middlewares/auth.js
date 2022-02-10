"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuth = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const errorResponse_1 = require("../utils/errorResponse");
const isAuth = async (req, res, next) => {
    try {
        const authorization = req.headers['authorization'];
        if (!authorization) {
            throw new Error('Student is not authenticated');
        }
        const accessToken = authorization.split(' ')[1];
        let payload = (0, jsonwebtoken_1.verify)(accessToken, process.env.ACCESS_TOKEN_SECRET);
        if (!payload) {
            throw new Error("Student's access token is invalid");
        }
        req.user = payload;
        return next();
    }
    catch (error) {
        res.status(401).json((0, errorResponse_1.errorResponseBody)(error.message));
    }
};
exports.isAuth = isAuth;
//# sourceMappingURL=auth.js.map