import { GroupModel, PermissionModel, sequelize } from '../../data-access';
import { Group } from '../../models/group';
import { groupMapper } from './group-mapper';


export const getGroups = async (): Promise<Group[]> => {
  return (await GroupModel.findAll({include: [GroupModel.associations.permissionModels]}))
    .map(groupMapper.toDomain);
};

export const getGroup = async (id: string): Promise<Group | null> => {
  const queryResult = await GroupModel.findByPk(id, { include: [
    GroupModel.associations.permissionModels,
    GroupModel.associations.userModels
  ] });
  return queryResult ? groupMapper.toDomain(queryResult) : null;
};

export const createGroup = async (group: Group): Promise<Group> => {
  const permissions = await PermissionModel.findAll({ where: { name: group.permissions } });
  const createdGroup = await sequelize.transaction(async t => {
    const creatingGroup = await GroupModel.create(groupMapper.toDalEntity(group), { transaction: t });
    await creatingGroup.setPermissionModels(permissions, { transaction: t });
    return creatingGroup;
  });
  await createdGroup.reload({ include: GroupModel.associations.permissionModels });
  return groupMapper.toDomain(createdGroup);
};

export const updateGroup = async (id: string, group: Group): Promise<Group | null> => {
  const existingGroup = await GroupModel.findByPk(id);
  if (!existingGroup) {
    return null;
  }
  const permissions = await PermissionModel.findAll({ where: { name: group.permissions } });
  const updatedGroup = await sequelize.transaction(async t => {
    const updatingGroup = await existingGroup.update(groupMapper.toDalEntity(group), { transaction: t });
    await updatingGroup.setPermissionModels(permissions, { transaction: t, include: GroupModel.associations.permissionModels });
    return updatingGroup;
  });
  await updatedGroup.reload({ include: GroupModel.associations.permissionModels });
  return groupMapper.toDomain(updatedGroup);
};

export const deleteGroup = async (id: string): Promise<Group | null> => {
  const group = await GroupModel.findByPk(id);
  if (!group) {
    return null;
  }
  await group.destroy();
  return groupMapper.toDomain(group);
};

export const addUsersToGroup = async (groupId: string, userIds: string[]): Promise<true | null> => {
  return await sequelize.transaction(async t => {
    const group = await GroupModel.findByPk(groupId, { transaction: t });
    if (!group) {
      return null;
    }
    await group.addUserModels(userIds, { transaction: t });
    return true;
  });
};
