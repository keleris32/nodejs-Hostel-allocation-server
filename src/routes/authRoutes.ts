import express from 'express';

import { loginStudent } from '../controllers/auth/loginController';
import { registerStudent } from '../controllers/auth/registerController';

const authRouter = express.Router();

//@desc Register a new student
//@route POST /api/auth/register
authRouter.post('/register', registerStudent);

//@desc Login a student
//@route POST /api/auth/login
authRouter.post('/login', loginStudent);

export default authRouter;
