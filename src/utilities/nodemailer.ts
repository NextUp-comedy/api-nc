import { createTransport } from 'nodemailer';
import config from '../config';

const { appMail, mailPassword } = config.server;

export default async (to: string, subject: string, content: string):Promise<void> => {
  const transporter = createTransport({
    host: 'smtp.gmail.com',
    auth: {
      user: appMail,
      pass: mailPassword,
    },
  });

  await transporter.sendMail({
    from: appMail,
    to,
    subject,
    html: content,
  });
};
