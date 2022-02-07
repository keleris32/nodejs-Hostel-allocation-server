require('dotenv').config();

import express, { Request, Response, Application } from 'express';
import cors from 'cors';

const app: Application = express();

app.use(cors()); // Cross-Origin-Resource-Sharing
app.use(express.json()); // Parse to JSON

// Routes
app.get(
  '/',
  (_req: Request, res: Response): Response => res.send('Hello from Homepage')
);

app.listen(process.env.PORT || 4000, (): void =>
  console.log(`Conected to port!`)
);
