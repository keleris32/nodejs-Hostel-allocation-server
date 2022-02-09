import { Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import {
  CreateAccessToken,
  CreateRefreshToken,
} from '../middlewares/createToken';

import { SendRefreshToken } from '../middlewares/sendRefreshToken';

// @ts-ignore
import pool from '../config/dbConnector';

export const refreshAccessToken = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.CEU;

  if (!refreshToken) {
    return res.send({ ok: false, access_token: '' });
  }

  let payload: any = null;

  try {
    // Verify the refreshToken with the Token secret,
    // and grab the student's matricNumber from the payload
    payload = verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!);
  } catch (error) {
    return res.send({ ok: false, access_token: '' });
  }

  // Search for the student in the database with a matching matric number
  const student = await pool.query('SELECT * FROM students WHERE id = $1', [
    payload.matricNumber,
  ]);

  if (!student) {
    return res.send({ ok: false, access_token: '' });
  }

  // Create new refreshToken to basically reset the token's expiry date
  SendRefreshToken(res, CreateRefreshToken(student.rows[0].matric_no));

  // Return a new accessToken if student matric number matches.
  return res.send({
    ok: true,
    access_token: CreateAccessToken(student.rows[0].matric_no),
  });
};
