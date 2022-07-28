import {
  InferAttributes, InferCreationAttributes, Model,
} from 'sequelize';

import {
  Secret,
} from 'jsonwebtoken';
import { Request } from 'express';

interface IServerAddress{
  port: number;
  address: string;
}

interface IUser{
  id:number
  roleId:number
  email:string
  username:string
  role?:string
}

interface IServer{
  SECRET_KEY: Secret;
  APP_MAIL: string;
  MAIL_PASSWORD: string;
  PORT: string;
  CLIENT_URL: string;
  SERVER_URL: string;
  CLIENT_ID: string;
  GOOGLE_API: string;
}

interface IDatabase{
url:string
}
interface GoogleUserRequest extends Request {
  googleUserData: { sub: string,
    email: string,
    isVerified: string,
    name: string,
    image: string, },
}

interface ApprovedUser {
  id: number,
  email: string,
  roleId: number,
  username: string,
}

interface IUsers extends Model<
  InferAttributes<IUsers>, InferCreationAttributes<IUsers>
> {
  id?: number;
  username: string;
  email: string;
  password: string;
  roleId: number;
  isVerified?: boolean,
  status?: string;
  googleId?: string;
  accPaidRevenue?: number;
  freeToBePaidRevenue?: number;
  createdBy?: number;
  updatedBy?: number;
  image?: string;
  reasonOfRejection?: string;
}

interface UserAuth extends Request {
  user?: IUsers,
  admin?: { id: number, email: string, role: string },
}
interface ErrorWithDetails extends Error {
  details: [
    {
      message: string
    }
  ];
 }

export {
  IServerAddress,
  IUser,
  IServer,
  IDatabase,
  UserAuth,
  ApprovedUser,
  GoogleUserRequest,
  IUsers,
  ErrorWithDetails,
};
