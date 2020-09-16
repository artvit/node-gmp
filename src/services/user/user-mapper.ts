import { UserAttributes } from '../../data-access';
import { User } from '../../models/user';
import { DataMapper } from '../../util/data-mapper';

export const userMapper: DataMapper<User, UserAttributes> = {
  toDomain: ue => ({
    id: ue.id,
    login: ue.login,
    age: ue.age,
    password: ue.password
  }),
  toDalEntity: (user: User): UserAttributes => ({ ...user, isDeleted: false })
};
