"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middlewares/auth");
const getAvailableRoomsController_1 = require("../controllers/rooms/getAvailableRoomsController");
const roomsRouter = express_1.default.Router();
roomsRouter.get('/rooms', auth_1.isAuth, getAvailableRoomsController_1.getAvailableRooms);
exports.default = roomsRouter;
//# sourceMappingURL=roomsRoute.js.map