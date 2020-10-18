import { UserModel } from '../../data-access';
import { User } from '../../models/user';
import { logger } from '../../util/logging/logger';
import { userMapper } from './user-mapper';


export const getUsers = async (loginSubstring?: string, limit?: number): Promise<User[]> => {
  try {
    const queryResult = await UserModel.findAll({ where: { isDeleted: false } });
    let result = queryResult.map(userMapper.toDomain);
    if (loginSubstring) {
      result = result.filter(user => user.login.includes(loginSubstring));
    }
    result = result.sort((u1, u2) => u1.login.localeCompare(u2.login));
    if (limit) {
      result = result.slice(0, limit);
    }
    return result;
  } catch (e) {
    logger.error({ function: 'getUsers', args: { loginSubstring, limit }, error: e });
    throw e;
  }
};

export const getUser = async (id: string): Promise<User | null> => {
  try {
    const queryResult = await UserModel.findByPk(id);
    if (!queryResult) {
      return null;
    }
    return userMapper.toDomain(queryResult);
  } catch (e) {
    logger.error({ function: 'getUser', args: { id }, error: e });
    throw e;
  }
};

export const getUserByLogin = async (login: string): Promise<User | null> => {
  try {
    const queryResult = await UserModel.findOne({ where: { login: login } });
    if (!queryResult) {
      return null;
    }
    return userMapper.toDomain(queryResult);
  } catch (e) {
    logger.error({ function: 'getUserByLogin', args: { login }, error: e });
    throw e;
  }
};

export const createUser = async (user: User): Promise<User> => {
  try {
    const queryResult = await UserModel.create(userMapper.toDalEntity(user));
    return userMapper.toDomain(queryResult);
  } catch (e) {
    logger.error({ function: 'createUser', args: { user }, error: e });
    throw e;
  }
};

export const updateUser = async (id: string, user: User): Promise<User | null> => {
  try {
    const queryResult = await UserModel.findByPk(id);
    if (!queryResult) {
      return null;
    }
    const updatedUser = await queryResult.update(userMapper.toDalEntity(user));
    return userMapper.toDomain(updatedUser);
  } catch (e) {
    logger.error({ function: 'updateUser', args: { id, user }, error: e });
    throw e;
  }
};

export const deleteUser = async (id: string): Promise<User | null> => {
  try {
    const deletedUser = await UserModel.findByPk(id);
    if (!deletedUser) {
      return null;
    }
    const user = await deletedUser.update({ isDeleted: true });
    return userMapper.toDomain(user);
  } catch (e) {
    logger.error({ function: 'deleteUser', args: { id }, error: e });
    throw e;
  }
};
