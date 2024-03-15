import { Model } from "sequelize";
export interface UserAttributes {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    password: string;
    location: string;
    interest: string;
    agent_code: string;
    sub_channel: string;
    channel: string;
}
export declare class Users extends Model<UserAttributes> {
}
export default Users;
