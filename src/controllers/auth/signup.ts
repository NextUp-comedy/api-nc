import { Request, Response, NextFunction } from 'express';
import { hash } from 'bcrypt';
import { Users } from '../../database/models';
import { checkExistence, constants } from '../../helpers';
import {
  sendEmail,
  signupSchema,
  validateError,
  signToken,
} from '../../utilities';
import config from '../../config';

export default async ({ body }: Request, res: Response, next: NextFunction):Promise<void> => {
  const { username, email, password } = body;
  const { emailCheck } = constants.messages.check;
  const { verifyToken } = constants.messages.token;

  try {
    await signupSchema.validateAsync(body);

    await checkExistence.RegistrationCheck(email);

    const hashedPassword = await hash(password, 10);
    const user = await Users.create({
      username,
      email,
      roleId: 2,
      password: hashedPassword,
      createdBy: 1,
    });

    const { id, roleId } = user;
    const token = await signToken({
      id: Number(id),
      username,
      email,
      roleId,
    }, { expiresIn: '1h' });

    const redirectURL = `${config.server.SERVER_URL}/api/v1/auth/verify-email/${token}`;

    await sendEmail({
      email, type: 'verify', username, redirectURL,
    });

    res
      .cookie(verifyToken, token)
      .status(201)
      .json({ message: emailCheck });
  } catch (err) {
    next(validateError(err as Error)); // TODO: handle internal server error
  }
};
