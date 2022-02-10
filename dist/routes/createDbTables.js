"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const createTablesController_1 = require("../controllers/createTablesController");
const createTablesRouter = express_1.default.Router();
createTablesRouter.post('/create-tables', createTablesController_1.createDbTables);
exports.default = createTablesRouter;
//# sourceMappingURL=createDbTables.js.map