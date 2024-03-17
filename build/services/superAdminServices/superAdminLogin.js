"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSuperAdmin = void 0;
const validations_1 = require("../../validators/validations");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const super_admin_entity_1 = __importDefault(require("../../entities/super-admin-entity"));
const helpers_1 = require("../../helperFunctions/helpers");
//==============LOGIN FUNCTION FOR SUPER ADMIN===============//
const loginSuperAdmin = async (request, response) => {
    try {
        //Fetching and validating required input from the request body
        const { email, password } = request.body;
        const validateInput = await validations_1.loginSchema.validateAsync(request.body);
        if (validateInput.error) {
            return response.status(400).json({
                Error: validateInput.error.details[0].message,
            });
        }
        //This checks if the admin exists in the database
        const admin = (await super_admin_entity_1.default.findOne({
            where: { email },
        }));
        if (!admin) {
            return response.status(404).json({
                message: `admin does not exist`,
            });
        }
        //This checks if the password is correct
        const validatePassword = await bcryptjs_1.default.compare(password, admin.password);
        if (!validatePassword) {
            return response.status(401).send({
                status: "error",
                message: "Password is Incorect",
            });
        }
        //This generates a token for the admin
        const tokenData = {
            id: admin.id,
            email: admin.email,
        };
        const token = await (0, helpers_1.generateToken)(tokenData);
        return response.status(201).json({
            status: "success",
            message: "Login Successful",
            admin,
            token
        });
    }
    catch (error) {
        return response.status(500).json({
            status: `error`,
            message: `Internal Server Error`,
        });
    }
};
exports.loginSuperAdmin = loginSuperAdmin;
