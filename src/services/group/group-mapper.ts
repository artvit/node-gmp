import { GroupAttributes, GroupModel } from '../../data-access';
import { Group } from '../../models/group';
import { DataMapper } from '../../util/data-mapper';
import { userMapper } from '../user';

export const groupMapper: DataMapper<Group, GroupAttributes> = {
  toDomain: (model: GroupModel): Group => ({
    id: model.id,
    name: model.name,
    permissions: model.permissionModels?.map(p => p.name),
    users: model.userModels?.map(userMapper.toDomain)
  }),

  toDalEntity: (domain: Group): GroupAttributes => ({
    id: domain.id,
    name: domain.name
  }),
};
