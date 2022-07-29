import { NextFunction, Request, Response } from 'express';
import {
  idValidation, validateError, sendEmail,
} from '../../utilities';
import config from '../../config';
import { checkExistence, constants } from '../../helpers';

export default async (req: Request, res: Response, next: NextFunction)
:Promise<void> => {
  const { userId } = req.params;
  const redirectURL = `${config.server.clientURL}/faq`; // TODO: to be modified with FAQ page
  const contactUs = `mailto:${config.email.NEXTUP_COMEDY_SUPPORT_EMAIL}`;

  try {
    await idValidation.validateAsync({ userId });

    const user = await checkExistence.VerificationChecks(+userId);

    user.status = constants.userStatus.rejected;
    await user.save();

    const { username, email } = user;

    await sendEmail({
      email, type: 'reject', username, redirectURL, contactUs,
    });

    res
      .status(201)
      .json({ message: constants.messages.check.emailCheck });
  } catch (err) {
    next(validateError(err as Error));
  }
};
