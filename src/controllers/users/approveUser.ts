import { NextFunction, Request, Response } from 'express';
import {
  idValidation, validateError, sendEmail,
} from '../../utilities';
import config from '../../config';
import { checkExistence, constants } from '../../helpers';

export default async (req: Request, res: Response, next: NextFunction)
:Promise<void> => {
  const { userId } = req.params;
  const redirectURL = `${config.server.CLIENT_URL}`;

  try {
    await idValidation.validateAsync({ userId });

    const user = await checkExistence.VerificationChecks(+userId);

    user.status = constants.userStatus.approved;
    await user.save();

    const { username, email } = user;

    await sendEmail({
      email, type: 'approve', username, redirectURL,
    });

    res
      .status(201)
      .json({ message: constants.messages.authResponse.adminApproval });
  } catch (err) {
    next(validateError(err as Error));
  }
};
