"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const refreshTokenController_1 = require("../controllers/refreshTokenController");
const refreshTokenRouter = express_1.default.Router();
refreshTokenRouter.post('/refresh-token', refreshTokenController_1.refreshAccessToken);
exports.default = refreshTokenRouter;
//# sourceMappingURL=refreshTokenRoute.js.map