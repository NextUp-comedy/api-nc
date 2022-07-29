import dotenv from 'dotenv';
import Logger from '../../helpers/logger';
import { sequelize } from '.';

dotenv.config();

const { env: { NODE_ENV } } = process;

const buildDB = async ():Promise<void> => {
  try {
    await sequelize.sync({ force: true });
    Logger.info('Database has been built');
  } catch (err) {
    Logger.error('Error while connecting to DB - ', err);
  } finally {
    await sequelize.close();
    Logger.info('Database Connection has been closed');
  }
};

if (NODE_ENV === 'development') buildDB();

export default buildDB;
