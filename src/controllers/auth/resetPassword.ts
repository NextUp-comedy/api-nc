import { Request, Response, NextFunction } from 'express';
import { hash } from 'bcrypt';
import {
  CustomError,
  verifyToken,
  tokenError,
} from '../../utilities';
import { constants, checkExistence } from '../../helpers';

export default async (req: Request, res: Response, next: NextFunction):Promise<void> => {
  const { password } = req.body;
  const { resetPasswordToken } = req.cookies;
  const { resetToken } = constants.messages.token;
  const { unAuthUser, reset } = constants.messages.authResponse;

  try {
    if (!resetPasswordToken) throw new CustomError(unAuthUser, 401);

    const { email } = await verifyToken(resetPasswordToken);

    const userData = await checkExistence.ApprovalChecks(email);

    const hashedPassword = await hash(password, 10);
    userData.password = hashedPassword;
    await userData.save();

    res.status(201).clearCookie(resetToken).json({ message: reset });
  } catch (err) {
    next(tokenError(err as Error));
  }
};
