import { sign } from 'jsonwebtoken';

export const CreateAccessToken = (matric_no: string, gender: string) => {
  return sign(
    { matricNumber: matric_no, gender: gender },
    process.env.ACCESS_TOKEN_SECRET!,
    {
      expiresIn: '1d',
    }
  );
};

export const CreateRefreshToken = (matric_no: string) => {
  return sign({ matricNumber: matric_no }, process.env.REFRESH_TOKEN_SECRET!, {
    expiresIn: '7d',
  });
};
