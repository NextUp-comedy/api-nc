import { NextFunction, Request, Response } from 'express';
import {
  emailValidation, validateError, signToken, sendEmail,
} from '../../utilities';
import config from '../../config';
import { constants, checkExistence } from '../../helpers';

export default async ({ body }: Request, res: Response, next: NextFunction)
:Promise<void> => {
  const { resetToken } = constants.messages.token;
  const { emailCheck } = constants.messages.check;
  try {
    await emailValidation.validateAsync(body);

    const user = await checkExistence.ApprovalChecks(body.email);

    const {
      username, email, roleId, id,
    } = user;
    const token = await signToken({
      id: Number(id),
      username,
      email,
      roleId,
    }, { expiresIn: '1h' });

    const redirectURL = `${config.server.serverURL}/api/v1/auth/reset-password/${token}`;

    await sendEmail({
      email,
      type: 'reset',
      username,
      redirectURL,
    });

    res
      .cookie(resetToken, token)
      .status(201)
      .json({ message: emailCheck });
  } catch (err) {
    next(validateError(err as Error));
  }
};
