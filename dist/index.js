'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
require('dotenv').config();
const express_1 = __importDefault(require('express'));
const cors_1 = __importDefault(require('cors'));
const cookie_parser_1 = __importDefault(require('cookie-parser'));
const authRoutes_1 = __importDefault(require('./routes/authRoutes'));
const refreshTokenRoute_1 = __importDefault(
  require('./routes/refreshTokenRoute')
);
const roomsRoute_1 = __importDefault(require('./routes/roomsRoute'));
const createPaymentIntentRoute_1 = __importDefault(
  require('./routes/createPaymentIntentRoute')
);
const paystackWebhookRoute_1 = __importDefault(
  require('./routes/paystackWebhookRoute')
);
const studentsRoute_1 = __importDefault(require('./routes/studentsRoute'));
const createDbTables_1 = __importDefault(require('./routes/createDbTables'));
const app = (0, express_1.default)();
app.use(
  (0, cors_1.default)({
    origin: process.env.CORS_ORIGIN_URL,
    credentials: true,
  })
);
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use('/api/auth', authRoutes_1.default);
app.use('/api', refreshTokenRoute_1.default);
app.use('/api', roomsRoute_1.default);
app.use('/api', createPaymentIntentRoute_1.default);
app.use('/api', paystackWebhookRoute_1.default);
app.use('/api', studentsRoute_1.default);
app.use('/api', createDbTables_1.default);
app.listen(process.env.PORT || 4000, () => console.log(`Conected to port!`));
//# sourceMappingURL=index.js.map
