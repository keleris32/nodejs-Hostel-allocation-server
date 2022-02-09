import { Request, Response } from 'express';
// import { Student } from '../../types/students';
import { errorResponseBody } from '../../utils/errorResponse';
import { successResponseBody } from '../../utils/successResponse';

// @ts-ignore
import pool from '../../config/dbConnector';
import { verify } from 'jsonwebtoken';

export const allocateRoomController = async (req: Request, res: Response) => {
  try {
    // Chosen room from client
    // const { room_id }: Student = req.body;
    const room_id = req.user!.room_id;

    // Student's matric number gotten from access token
    // const matricNumber = req.user!.matricNumber;
    const refreshToken = req.cookies.CEU;

    let payload: any = null;

    // Verify the refreshToken with the Token secret,
    // and grab the student's matricNumber from the payload
    payload = verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!);

    if (!room_id)
      throw new Error('Provide required credential before proceeding!');

    await pool.query('UPDATE students SET room_id = $1 WHERE matric_no = $2', [
      room_id,
      payload.matricNumber,
    ]);

    const responseMessage: string = 'Room allocated successfully!';
    const responseData: Object = {};

    res.status(201).json(successResponseBody(responseMessage, responseData));
  } catch (error) {
    if (error.message === 'Provide required credentials before proceeding!') {
      res.status(400).json(errorResponseBody(error.message));
    } else {
      res.status(500).json(errorResponseBody('Internal Server Error!'));
    }
  }
};
