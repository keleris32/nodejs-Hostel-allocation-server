require('dotenv').config();

// Packages
import express, { Application } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// Routes
import authRouter from './routes/authRoutes';
import refreshTokenRouter from './routes/refreshTokenRoute';

const app: Application = express();

app.use(cors()); // Cross-Origin-Resource-Sharing
// app.use(express.urlencoded({ extended: true })); /** Decode Form URL Encoded data */
app.use(express.json()); // Parse to JSON
app.use(cookieParser()); // Parse cookies from req

// API Routes
app.use('/api/auth', authRouter); // Auth route
app.use('/api', refreshTokenRouter); // refresh-token route

app.listen(process.env.PORT || 4000, (): void =>
  console.log(`Conected to port!`)
);
