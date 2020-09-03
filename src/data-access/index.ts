import { sequelize } from './init';
import { initUser } from './model/user';

export const UserModel = initUser(sequelize);
