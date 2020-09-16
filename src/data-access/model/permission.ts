import { DataTypes, Model, Sequelize } from 'sequelize';
import { allPermissions, Permission } from '../../models/group';


export interface PermissionAttributes {
  id: number;
  name: Permission;
}

export class PermissionModel extends Model<PermissionAttributes> implements PermissionAttributes {
  id!: number;
  name!: Permission;
}

export const initPermission = (sequelize: Sequelize): void => {
  PermissionModel.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.ENUM(...allPermissions),
      allowNull: false,
      unique: true
    },
  }, {
    tableName: 'permissions',
    timestamps: false,
    sequelize
  });
};
