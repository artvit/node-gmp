import { Sequelize } from 'sequelize';
import { initGroup } from './model/group';
import { initPermission } from './model/permission';
import { initUser } from './model/user';

const uri = process.env.DB_URI;
const runSync = !!process.env.DB_SYNC;

if (!uri) {
  console.error('DB_URI is not provided');
  process.exit(1);
}

export const sequelize = new Sequelize(uri, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

export const initDb = async (): Promise<void> => {
  await sequelize.authenticate();
  console.log('Connection established successfully.');

  initUser(sequelize);
  initPermission(sequelize);
  initGroup(sequelize);

  if (runSync) {
    await sequelize.sync();
    console.log('DB Synced');
  }
};
