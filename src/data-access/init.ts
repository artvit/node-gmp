import { Sequelize } from 'sequelize';
import { GroupModel, initGroup } from './model/group';
import { initPermission, PermissionModel } from './model/permission';
import { initUser, UserModel } from './model/user';
import { getConfig } from '../config';

const uri = getConfig().DB_URI;
const runSync = !!getConfig().DB_SYNC;
let sequelize: Sequelize;

export const getSequelize = (): Sequelize => {
  if (!sequelize) {
    if (!uri) {
      console.error('DB_URI is not provided');
      process.exit(1);
    }
    sequelize = new Sequelize(uri, {
      dialect: 'postgres',
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      }
    });
  }
  return sequelize;
};

export const initDb = async (): Promise<void> => {
  await getSequelize().authenticate();
  console.log('Connection established successfully.');

  initUser(getSequelize());
  initPermission(getSequelize());
  initGroup(getSequelize());

  GroupModel.belongsToMany(PermissionModel, { through: 'GroupPermission', timestamps: false, as: 'permissionModels' });
  GroupModel.belongsToMany(UserModel, { through: 'UserGroup', timestamps: false, onDelete: 'cascade', as: 'userModels' });
  UserModel.belongsToMany(GroupModel, { through: 'UserGroup', timestamps: false, onDelete: 'cascade' });

  if (runSync) {
    await getSequelize().sync();
    console.log('DB Synced');
  }
};
