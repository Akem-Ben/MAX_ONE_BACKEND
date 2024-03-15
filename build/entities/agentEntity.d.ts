import { Model } from "sequelize";
export interface AgentAttributes {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    password: string;
    location: string;
    code: string;
}
export declare class Agent extends Model<AgentAttributes> {
}
export default Agent;
