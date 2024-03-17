"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSuperAdmin = void 0;
const uuid_1 = require("uuid");
const super_admin_entity_1 = __importDefault(require("../../entities/super-admin-entity"));
const helpers_1 = require("../../helperFunctions/helpers");
const validations_1 = require("../../validators/validations");
//==============REGISTRATION FUNCTION FOR CREATING SUPER ADMIN===============//
const createSuperAdmin = async (request, response) => {
    try {
        //This fetches and validates the required input from the request body
        const { first_name, last_name, email, phone, password, confirm_password } = request.body;
        const validate = await validations_1.registerAdminSchema.validateAsync(request.body);
        if (validate.error) {
            return response.status(400).json({
                Error: validate.error.details[0].message,
            });
        }
        //This checks if the email already exists in the database
        const validateEmail = await super_admin_entity_1.default.findOne({ where: { email } });
        if (validateEmail) {
            return response.status(400).json({
                status: `error`,
                message: `${email} already in use`,
            });
        }
        //This checks if the password and confirm_password match
        if (password !== confirm_password) {
            return response.status(400).json({
                status: "error",
                message: "Password mismatch",
            });
        }
        //This hashes the password
        const newPassword = await (0, helpers_1.hashPassword)(password);
        //This creates a new super admin
        const newAdmin = (await super_admin_entity_1.default.create({
            id: (0, uuid_1.v4)(),
            first_name,
            last_name,
            email,
            phone,
            password: newPassword,
        }));
        //This checks if the new admin was created successfully
        const newAdminInstance = await super_admin_entity_1.default.findOne({
            where: { id: newAdmin.id },
        });
        if (!newAdminInstance) {
            return response.status(400).json({
                status: "error",
                message: "Something went wrong",
            });
        }
        response.status(201).json({
            status: "success",
            message: "Super Admin created successfully",
            newAdminInstance,
        });
    }
    catch (error) {
        return response.status(500).json({
            status: "error",
            message: `Internal Server Error: ${error}`,
        });
    }
};
exports.createSuperAdmin = createSuperAdmin;
