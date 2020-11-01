import { getSequelize, GroupModel, PermissionModel } from '../../data-access';
import { Group } from '../../models/group';
import { logger } from '../../util/logging/logger';
import { groupMapper } from './group-mapper';


export const getGroups = async (): Promise<Group[]> => {
  try {
    return (await GroupModel.findAll({ include: [GroupModel.associations.permissionModels] }))
      .map(groupMapper.toDomain);
  } catch (e) {
    logger.error({ function: 'getGroups', args: {}, error: e });
    throw e;
  }
};

export const getGroup = async (id: string): Promise<Group | null> => {
  try {
    const queryResult = await GroupModel.findByPk(id, {
      include: [
        GroupModel.associations.permissionModels,
        GroupModel.associations.userModels
      ]
    });
    return queryResult ? groupMapper.toDomain(queryResult) : null;
  } catch (e) {
    logger.error({ function: 'getGroup', args: { id }, error: e });
    throw e;
  }
};

export const createGroup = async (group: Group): Promise<Group> => {
  try {
    const permissions = await PermissionModel.findAll({ where: { name: group.permissions } });
    const createdGroup = await getSequelize().transaction(async t => {
      const creatingGroup = await GroupModel.create(groupMapper.toDalEntity(group), { transaction: t });
      await creatingGroup.setPermissionModels(permissions, { transaction: t });
      return creatingGroup;
    });
    await createdGroup.reload({ include: GroupModel.associations.permissionModels });
    return groupMapper.toDomain(createdGroup);
  } catch (e) {
    logger.error({ function: 'createGroup', args: { group }, error: e });
    throw e;
  }
};

export const updateGroup = async (id: string, group: Group): Promise<Group | null> => {
  try {
    const existingGroup = await GroupModel.findByPk(id);
    if (!existingGroup) {
      return null;
    }
    const permissions = await PermissionModel.findAll({ where: { name: group.permissions } });
    const updatedGroup = await getSequelize().transaction(async t => {
      const updatingGroup = await existingGroup.update(groupMapper.toDalEntity(group), { transaction: t });
      await updatingGroup.setPermissionModels(permissions, {
        transaction: t,
        include: GroupModel.associations.permissionModels
      });
      return updatingGroup;
    });
    await updatedGroup.reload({ include: GroupModel.associations.permissionModels });
    return groupMapper.toDomain(updatedGroup);
  } catch (e) {
    logger.error({ function: 'updateGroup', args: { id, group }, error: e });
    throw e;
  }
};

export const deleteGroup = async (id: string): Promise<Group | null> => {
  try {
    const group = await GroupModel.findByPk(id);
    if (!group) {
      return null;
    }
    await group.destroy();
    return groupMapper.toDomain(group);
  } catch (e) {
    logger.error({ function: 'deleteGroup', args: { id }, error: e });
    throw e;
  }
};

export const addUsersToGroup = async (groupId: string, userIds: string[]): Promise<true | null> => {
  try {
    return await getSequelize().transaction(async t => {
      const group = await GroupModel.findByPk(groupId, { transaction: t });
      if (!group) {
        return null;
      }
      await group.addUserModels(userIds, { transaction: t });
      return true;
    });
  } catch (e) {
    logger.error({ function: 'addUsersToGroup', args: { groupId, userIds }, error: e });
    throw e;
  }
};
