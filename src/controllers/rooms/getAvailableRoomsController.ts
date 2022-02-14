import { Request, Response } from 'express';
import { randomizeRooms } from '../../utils/randomizeRooms';
import { errorResponseBody } from '../../utils/errorResponse';
import { successResponseBody } from '../../utils/successResponse';

// @ts-ignore
import pool from '../../config/dbConnector';

export const getAvailableRooms = async (req: Request, res: Response) => {
  try {
    const studentGender = req.user!.gender.toLowerCase();
    const roomCapacity = 4;

    const availableRooms = await pool.query(
      'SELECT id, hostel, room_type, room_number, price, no_of_inhabitants, type_of_hostel FROM rooms WHERE type_of_hostel = $1 AND no_of_inhabitants < $2',
      [studentGender, roomCapacity]
    );

    if (availableRooms.rowCount !== 0) {
      let responseMessage = 'Hostel rooms fetched successfully!';
      res
        .status(200)
        .json(
          successResponseBody(
            responseMessage,
            randomizeRooms(availableRooms.rows)
          )
        );
    } else {
      throw new Error('There are no available rooms!');
    }
  } catch (error) {
    if (error.message) {
      res.status(400).send(errorResponseBody(error.message));
    } else {
      res.status(500).send(errorResponseBody('Internal Server Error!'));
    }
  }
};
