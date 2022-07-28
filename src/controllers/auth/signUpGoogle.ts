import { Request, Response, NextFunction } from 'express';
import { hash } from 'bcrypt';
import { OAuth2Client } from 'google-auth-library';
import axios from 'axios';
import generatePassword from 'generate-password';
import { Users } from '../../database/models';
import {
  validateError,
} from '../../utilities';
import config from '../../config';
import { checkExistence } from '../../helpers';

export default async ({ body }: Request, res: Response, next: NextFunction)
:Promise<void> => {
  const { tokenId } = body;
  try {
    // TODO: separate signUp with Google steps
    const client = new OAuth2Client(config.server.CLIENT_ID);
    const verify = async ():Promise<void> => {
      const ticket = await client.verifyIdToken({
        idToken: tokenId,
        audience: config.server.CLIENT_ID,
      });
      ticket.getPayload();
    };
    verify().catch(console.error);
    const {
      data: {
        sub,
        email,
        email_verified: isVerified,
        name,
        picture: image,
      },
    } = await axios.get(
      `${config.server.GOOGLE_API}tokeninfo?id_token=${tokenId}`,
    );

    await checkExistence.RegistrationCheck(email);

    const password = generatePassword.generate({
      length: 20, numbers: true, strict: true, lowercase: true, uppercase: true,
    });
    const hashedPassword = await hash(password, 10);
    await Users.create({
      username: name,
      email,
      roleId: 2,
      password: hashedPassword,
      createdBy: 1,
      isVerified,
      image,
      googleId: sub,
    });
    res.status(201).redirect(`${config.server.CLIENT_URL}/verifyEmail`);
  } catch (error) {
    next(validateError(error as Error));
  }
};
