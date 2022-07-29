import Logger from '../../helpers/logger';
import {
  sequelize,
  Users,
  Tags,
  Categories,
  Roles,
  UploadsCategories,
  Uploads,
  UploadsTags,
} from '../config';

import {
  users,
  tags,
  categories,
  uploads,
  uploadsCategories,
  uploadsTags,
  roles,
} from './fakeData';

const { NODE_ENV } = process.env;

const buildFakeData = async (): Promise<void> => {
  try {
    await sequelize.sync({ force: true });

    await Promise.all([
      await Roles.bulkCreate(roles),
      await Tags.bulkCreate(tags),
      await Categories.bulkCreate(categories),
    ]);
    await Promise.all([
      await Users.bulkCreate(users),
      await Uploads.bulkCreate(uploads),
    ]);
    await Promise.all([
      await UploadsTags.bulkCreate(uploadsTags),
      await UploadsCategories.bulkCreate(uploadsCategories),
    ]);

    Logger.info('Fake data has been built');
  } catch (error) {
    Logger.error('Failed to insert data to the Database - ', error);
  } finally {
    await sequelize.close();
    Logger.info('Database Connection has been closed');
  }
};

if (NODE_ENV === 'development') buildFakeData();

export default buildFakeData;
