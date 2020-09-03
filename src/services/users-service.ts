import { UserModel } from '../data-access';
import { UserAttributes } from '../data-access/model/user';
import { User } from '../models/user';
import { DataMapper } from '../util/data-mapper';

const dataMapper: DataMapper<User, UserAttributes> = {
  toDomain:  ue => ({
    id: ue.id,
    login: ue.login,
    age: ue.age,
    password: ue.password
  }),
  toDalEntity: (user: User): UserAttributes => user
};

const userStorage = UserModel;

export const getUsers = async (loginSubstring?: string, limit?: number): Promise<User[]> => {
  const queryResult = await userStorage.findAll({ where: { isDeleted: false } });
  let result = queryResult.map(dataMapper.toDomain);
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
  return dataMapper.toDomain(queryResult);
};

export const createUser = async (user: User): Promise<User> => {
  const queryResult = await userStorage.create(dataMapper.toDalEntity(user));
  return dataMapper.toDomain(queryResult);
};

export const updateUser = async (id: string, user: User): Promise<User | null> => {
  const queryResult = await userStorage.findByPk(id);
  if (!queryResult) {
    return null;
  }
  const updatedUser = await queryResult.update(dataMapper.toDalEntity(user));
  return dataMapper.toDomain(updatedUser);
};

export const deleteUser = async (id: string): Promise<User | null> => {
  const deletedUser = await userStorage.findByPk(id);
  if (!deletedUser) {
    return null;
  }
  const user = await deletedUser.update({ isDeleted: true });
  return dataMapper.toDomain(user);
};
