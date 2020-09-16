import { UserModel } from '../../data-access';
import { User } from '../../models/user';
import { userMapper } from './user-mapper';


const userStorage = UserModel;

export const getUsers = async (loginSubstring?: string, limit?: number): Promise<User[]> => {
  const queryResult = await userStorage.findAll({ where: { isDeleted: false } });
  let result = queryResult.map(userMapper.toDomain);
  if (loginSubstring) {
    result = result.filter(user => user.login.includes(loginSubstring));
  }
  result = result.sort((u1, u2) => u1.login.localeCompare(u2.login));
  if (limit) {
    result = result.slice(0, limit);
  }
  return result;
};

export const getUser = async (id: string): Promise<User | null> => {
  const queryResult = await userStorage.findByPk(id);
  if (!queryResult) {
    return null;
  }
  return userMapper.toDomain(queryResult);
};

export const createUser = async (user: User): Promise<User> => {
  const queryResult = await userStorage.create(userMapper.toDalEntity(user));
  return userMapper.toDomain(queryResult);
};

export const updateUser = async (id: string, user: User): Promise<User | null> => {
  const queryResult = await userStorage.findByPk(id);
  if (!queryResult) {
    return null;
  }
  const updatedUser = await queryResult.update(userMapper.toDalEntity(user));
  return userMapper.toDomain(updatedUser);
};

export const deleteUser = async (id: string): Promise<User | null> => {
  const deletedUser = await userStorage.findByPk(id);
  if (!deletedUser) {
    return null;
  }
  const user = await deletedUser.update({ isDeleted: true });
  return userMapper.toDomain(user);
};
