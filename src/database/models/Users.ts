import { DataTypes } from 'sequelize';
import Role from './Roles';
import { IUsers } from '../../interfaces';
import sequelize from '../config/connections';
import { userStatus } from '../../helpers/constants';

const {
  approved, rejected, pending, banned,
} = userStatus;

const Users = sequelize.define<IUsers>(
  'users',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Role,
        key: 'id',
      },
    },
    googleId: {
      type: DataTypes.STRING,
    },
    accPaidRevenue: {
      type: DataTypes.DECIMAL,
      defaultValue: 0,
    },
    freeToBePaidRevenue: {
      type: DataTypes.DECIMAL,
      defaultValue: 0,
    },
    createdBy: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    updatedBy: {
      type: DataTypes.INTEGER,
    },
    status: {
      type: DataTypes.ENUM(approved, rejected, pending, banned),
      defaultValue: pending,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    reasonOfRejection: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    paranoid: true,
  },
);

export default Users;
