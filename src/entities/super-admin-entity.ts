import { DataTypes, Model } from "sequelize";
import { database } from "../configurations/index";

export interface SuperAdminAttributes {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password:string;
}

export class SuperAdmin extends Model<SuperAdminAttributes> {}

SuperAdmin.init(
  
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
  },
  {
    sequelize: database,
    tableName: "SuperAdmin",
  }
);

export default SuperAdmin;