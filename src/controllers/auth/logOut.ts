import { Request, Response } from 'express';
import { messages } from '../../helpers/constants';

export default async (req: Request, res: Response):
Promise<void> => {
  const { logOut } = messages.authResponse;
  const { accessToken } = messages.token;
  res.status(200).clearCookie(accessToken).json({ message: logOut });
};
