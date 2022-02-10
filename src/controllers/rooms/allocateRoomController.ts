import { Request, Response } from 'express';
import { errorResponseBody } from '../../utils/errorResponse';
import { successResponseBody } from '../../utils/successResponse';

// @ts-ignore
import pool from '../../config/dbConnector';

export const allocateRoomController = async (req: Request, res: Response) => {
  try {
    // Chosen room from client
    const room_id = req.user!.room_id;

    // Student's matric number gotten from Req.user
    const matricNumber = req.user!.matricNumber;

    await pool.query('UPDATE students SET room_id = $1 WHERE matric_no = $2', [
      room_id,
      matricNumber,
    ]);

    const responseMessage: string = 'Room allocated successfully!';
    const responseData: Object = {};

    res.status(201).json(successResponseBody(responseMessage, responseData));
  } catch (error) {
    res.status(500).json(errorResponseBody('Internal Server Error!'));
  }
};
