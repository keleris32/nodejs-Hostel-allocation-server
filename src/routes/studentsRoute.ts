import express from 'express';
import { getStudent } from '../controllers/getStudentController';
import { isAuth } from '../middlewares/auth';

const studentRouter = express.Router();

//@desc fetch student Info
//@route Get /api/student
studentRouter.get('/student', isAuth, getStudent);

export default studentRouter;
