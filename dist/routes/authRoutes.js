"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const loginController_1 = require("../controllers/auth/loginController");
const registerController_1 = require("../controllers/auth/registerController");
const authRouter = express_1.default.Router();
authRouter.post('/register', registerController_1.registerStudent);
authRouter.post('/login', loginController_1.loginStudent);
exports.default = authRouter;
//# sourceMappingURL=authRoutes.js.map