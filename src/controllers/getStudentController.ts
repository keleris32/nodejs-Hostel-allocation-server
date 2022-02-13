import { Request, Response } from 'express';
import { errorResponseBody } from '../utils/errorResponse';
import { successResponseBody } from '../utils/successResponse';

// @ts-ignore
import pool from '../config/dbConnector';

export const getStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;

    const student = await pool.query('SELECT * FROM students WHERE id = $1', [
      id,
    ]);

    const responseMessage = 'Student data fetched successfully!';

    if (student.rowCount !== 0) {
      if (student.rows[0].room_id !== null) {
        let studentWithoutRoom = await pool.query(
          'SELECT students.*, rooms.hostel, rooms.room_type, rooms.room_number, rooms.price, rooms.no_of_inhabitants, rooms.type_of_hostel FROM students INNER JOIN rooms ON students.room_id = rooms.id WHERE id = $1',
          [id]
        );

        res
          .status(200)
          .json(
            successResponseBody(responseMessage, studentWithoutRoom.rows[0])
          );
      } else {
        res
          .status(200)
          .json(successResponseBody(responseMessage, student.rows[0]));
      }
    } else {
      throw new Error('Could not fetch student data!');
    }
  } catch (error) {
    res.status(500).send(errorResponseBody('Internal Server Error!'));
  }
};
