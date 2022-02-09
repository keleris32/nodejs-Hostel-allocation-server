import { Request, Response } from 'express';
import { Student } from '../../types/students';
import { hash } from 'bcryptjs';
import {
  CreateAccessToken,
  CreateRefreshToken,
} from '../../middlewares/createToken';
import { SendRefreshToken } from '../../middlewares/sendRefreshToken';
import { successResponseBody } from '../../utils/successResponse';
import { errorResponseBody } from '../../utils/errorResponse';

// @ts-ignore
import pool from '../../config/dbConnector';

export const registerStudent = async (req: Request, res: Response) => {
  // Student data gotten from client
  const { name, level, course, matric_no, password, gender }: Student =
    req.body;

  try {
    const student = await pool.query(
      'SELECT matric_no FROM students WHERE matric_no = $1',
      [matric_no]
    );

    if (student.rowCount !== 0) {
      throw new Error('This matric number has been used!');
    }

    const hashedPassword = await hash(password, 12);

    await pool.query(
      'INSERT INTO students (name, level, course, matric_no, password, gender) VALUES ($1, $2, $3, $4, $5, $6)',
      [name, level, course, matric_no, hashedPassword, gender]
    );

    SendRefreshToken(res, CreateRefreshToken(matric_no));

    const responseBody = {
      name: name,
      level: level,
      course: course,
      matric_no: matric_no,
      gender: gender,
      access_token: CreateAccessToken(matric_no, gender),
    };

    const responseMessage = 'Registration was successful!';

    res.status(201).json(successResponseBody(responseMessage, responseBody));
  } catch (error) {
    if (error.message === 'This matric number has been used!') {
      res.status(400).json(errorResponseBody(error.message));
    } else if (error.message.includes('value too long')) {
      res.status(422).json(errorResponseBody('Invalid credentials provided!'));
    } else {
      res.status(500).json(errorResponseBody('Internal Server Error!'));
    }
  }
};
