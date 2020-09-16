import { DataTypes, Model, Sequelize, UUIDV4 } from 'sequelize';


export interface UserAttributes {
  id: string;
  login: string;
  password: string;
  age: number;
  isDeleted: boolean;
}

export class UserModel extends Model<UserAttributes> implements UserAttributes {
  age!: number;
  id!: string;
  isDeleted!: boolean;
  login!: string;
  password!: string;
}

export const initUser = (sequelize: Sequelize): void => {
  UserModel.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4
    },
    login: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    tableName: 'users',
    sequelize
  });
};
