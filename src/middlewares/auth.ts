import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { errorResponseBody } from '../utils/errorResponse';

export const isAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Read the request header and grab the authorization header
    // which is in the form of `Bearer ${token}`
    const authorization = req.headers['authorization'];

    if (!authorization) {
      throw new Error('Student is not authenticated');
    }

    // Split the authorization header and grab the access token
    const accessToken = authorization.split(' ')[1];

    // Verify the access token using the secret key
    let payload: any = verify(accessToken, process.env.ACCESS_TOKEN_SECRET!);

    if (!payload) {
      throw new Error("Student's access token is invalid");
    }

    // Pass the payload to the req object
    // so that it can be accessible in the next middleware
    req.user = payload;

    return next();
  } catch (error) {
    // Throw an error if access token was unable to be split
    // or if Payload was unable to be verified due to it being invalid or expired
    res.status(401).json(errorResponseBody(error.message));
  }
};
