import { NextFunction, Response } from 'express';
import { CustomError, editProfileValidation, validateError } from '../../utilities';
import { UserAuth } from '../../interfaces';
import { messages } from '../../helpers/constants';

export default async (req: UserAuth, res: Response, next: NextFunction)
:Promise<void> => {
  const { name } = req.body;
  const { user } = req;

  try {
    await editProfileValidation.validateAsync({ name });

    if (!user) throw new CustomError(messages.authResponse.notExist, 401);

    user.username = name;
    await user.save();

    res.json({ message: messages.authResponse.edit });
  } catch (error) {
    next(validateError(error as Error));
  }
};
