import { Response, NextFunction } from 'express';
import { UserAuth } from '../interfaces';
import { CustomError, verifyToken, tokenError } from '../utilities';
import { messages } from '../helpers/constants';
import { Users } from '../database/models';

export default async (req: UserAuth, res: Response, next: NextFunction):Promise<void> => {
  const { accessToken } = req.cookies;
  try {
    if (!accessToken) throw new CustomError(messages.authResponse.unAuthUser, 401);

    const { id } = await verifyToken(accessToken);

    const userData = await Users.findOne({ where: { id } });
    if (!userData) throw new CustomError(messages.authResponse.notExist, 400);
    req.user = userData;

    next();
  } catch (err) {
    next(tokenError(err as Error));
  }
};
