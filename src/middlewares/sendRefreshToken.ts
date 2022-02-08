import { Response } from 'express';

export const SendRefreshToken = (res: Response, token: string) => {
  res.cookie('CEU', token, {
    httpOnly: true,
    path: '/refresh_token',
    sameSite: 'none',
    secure: true,
  });
};
