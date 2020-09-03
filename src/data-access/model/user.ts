import { BuildOptions, DataTypes, Model, Sequelize, UUIDV4 } from 'sequelize';


export interface UserAttributes {
  id: string;
  login: string;
  password: string;
  age: number;
  isDeleted?: boolean;
}

export interface UserEntity extends Model<UserAttributes>, UserAttributes {}
export type UserStatic = typeof Model & {
  new (values?: Record<string, unknown>, options?: BuildOptions): UserEntity;
};

export const initUser = (sequelize: Sequelize): UserStatic => {
  return sequelize.define('User', {
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
    tableName: 'users'
  });
};




