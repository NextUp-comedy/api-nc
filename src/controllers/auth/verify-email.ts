import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../../utilities/jwt';
import config from '../../config';
import { checkExistence } from '../../helpers';

export default async (req: Request, res: Response, next: NextFunction)
:Promise<void> => {
  const { token } = req.params;

  try {
    const { email } = await verifyToken(token);

    const user = await checkExistence.VerificationEmailCheck(email);

    user.isVerified = true;
    await user.save();

    res.status(302).redirect(`${config.server.CLIENT_URL}/verifyEmail`);
  } catch (err) {
    next(err);
  }
};
