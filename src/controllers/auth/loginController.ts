import { Request, Response } from 'express';
import { Student } from '../../types/students';
import { compare } from 'bcryptjs';
import {
  CreateAccessToken,
  CreateRefreshToken,
} from '../../middlewares/createToken';
import { SendRefreshToken } from '../../middlewares/sendRefreshToken';
import { successResponseBody } from '../../utils/successResponse';
import { errorResponseBody } from '../../utils/errorResponse';

// @ts-ignore
import pool from '../../config/dbConnector';

export const loginStudent = async (req: Request, res: Response) => {
  // Login data from the client
  const { matric_no, password }: Student = req.body;

  try {
    const student = await pool.query(
      'SELECT id, room_id, name, gender, level, course, matric_no, password, gender FROM students WHERE matric_no = $1',
      [matric_no]
    );

    if (student.rowCount === 0) {
      throw new Error('No Student found with this credentials!');
    }

    const isPasswordValid = await compare(password, student.rows[0].password);

    if (!isPasswordValid) {
      throw new Error('Invalid credentials provided!');
    }

    SendRefreshToken(res, CreateRefreshToken(matric_no));

    if (student.rows[0].room_id === null) {
      const responseBody = {
        id: student.rows[0].id,
        room_id: student.rows[0].room_id,
        name: student.rows[0].name,
        level: student.rows[0].level,
        course: student.rows[0].course,
        matric_no: student.rows[0].matric_no,
        gender: student.rows[0].gender,
        access_token: CreateAccessToken(matric_no, student.rows[0].gender),
      };

      const responseMessage = 'Authentication was successful!';

      res.status(201).json(successResponseBody(responseMessage, responseBody));
    } else {
      const room = await pool.query(
        'SELECT rooms.id, rooms.hostel, rooms.room_type, rooms.room_number, rooms.price, rooms.no_of_inhabitants, rooms.type_of_hostel FROM students INNER JOIN rooms ON students.room_id = rooms.id WHERE students.id = $1',
        [student.rows[0].id]
      );

      const responseBody = {
        id: student.rows[0].id,
        room_id: student.rows[0].room_id,
        name: student.rows[0].name,
        level: student.rows[0].level,
        course: student.rows[0].course,
        matric_no: student.rows[0].matric_no,
        gender: student.rows[0].gender,
        access_token: CreateAccessToken(matric_no, student.rows[0].gender),
        hostel_details: room.rows[0],
      };

      const responseMessage = 'Authentication was successful!';

      res.status(201).json(successResponseBody(responseMessage, responseBody));
    }
  } catch (error) {
    if (error.message) {
      res.status(422).json(errorResponseBody(error.message));
    } else {
      res.status(500).json(errorResponseBody('Internal Server Error'));
    }
  }
};
