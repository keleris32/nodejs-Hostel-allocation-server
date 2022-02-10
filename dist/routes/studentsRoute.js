"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getStudentController_1 = require("../controllers/getStudentController");
const auth_1 = require("../middlewares/auth");
const studentRouter = express_1.default.Router();
studentRouter.get('/student', auth_1.isAuth, getStudentController_1.getStudent);
exports.default = studentRouter;
//# sourceMappingURL=studentsRoute.js.map