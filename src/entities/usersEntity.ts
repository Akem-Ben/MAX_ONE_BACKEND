import { DataTypes, Model } from "sequelize";
import { database } from "../configurations/index";
import { Locations } from "../interfaces/locations.interface";

export interface UserAttributes {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password?:string;
  location: string;
  stage: string;
  interest: string;
  agent_id: string;
  max_id: string;
  sub_channel: string;
  channel: string;
}

export class Users extends Model<UserAttributes> {}

Users.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Password is required",
        },
        notEmpty: {
          msg: "Password is required",
        },
      },
    },
    location: {
        type: DataTypes.ENUM(...Object.values(Locations)),
        allowNull: false,
      },
      stage: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    interest: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    max_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    agent_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    sub_channel: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    channel: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    sequelize: database,
    tableName: "Users",
  }
);

export default Users;
