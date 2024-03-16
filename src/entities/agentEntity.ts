import { DataTypes, Model } from "sequelize";
import { database } from "../configurations/index";
import { Locations } from "../interfaces/locations.interface";

export interface AgentAttributes {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password:string;
  location: string;
  agent_max_id: string;
  on_of_prospects: number;
}

export class Agent extends Model<AgentAttributes> {}

Agent.init(

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
    agent_max_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    on_of_prospects: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  },
  {
    timestamps: true,
    sequelize: database,
    tableName: "Agent",
  }
  
);

export default Agent;

