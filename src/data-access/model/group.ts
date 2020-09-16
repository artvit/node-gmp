import {
  Association, BelongsToManyAddAssociationsMixin,
  BelongsToManySetAssociationsMixin,
  DataTypes,
  Model,
  Optional,
  Sequelize,
  UUIDV4
} from 'sequelize';
import { PermissionModel } from './permission';
import { UserModel } from './user';

export interface GroupAttributes {
  id: string;
  name: string;
}

export class GroupModel extends Model<GroupAttributes, Optional<GroupAttributes, 'id'>> implements GroupAttributes {
  id!: string;
  name!: string;

  permissionModels?: PermissionModel[];
  setPermissionModels!: BelongsToManySetAssociationsMixin<PermissionModel, string>

  userModels?: UserModel[];
  addUserModels!: BelongsToManyAddAssociationsMixin<UserModel, string>

  public static associations: {
    permissionModels: Association<GroupModel, PermissionModel>;
    userModels: Association<UserModel, PermissionModel>;
  }
}

export const initGroup = (sequelize: Sequelize): void => {
  GroupModel.init( {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4
    },
    name: {
      type: DataTypes.STRING(64),
      allowNull: false
    }
  }, {
    tableName: 'groups',
    sequelize
  });
};
