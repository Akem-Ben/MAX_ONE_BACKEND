import { Model } from "sequelize";
export interface SuperAdminAttributes {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    password: string;
}
export declare class SuperAdmin extends Model<SuperAdminAttributes> {
}
export default SuperAdmin;
