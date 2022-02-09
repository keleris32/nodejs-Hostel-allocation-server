import express from 'express';
import { refreshAccessToken } from '../controllers/refreshTokenController';

const refreshTokenRouter = express.Router();

//@desc Register a new student
//@route POST /api/auth/register
refreshTokenRouter.post('/refresh-token', refreshAccessToken);

export default refreshTokenRouter;
