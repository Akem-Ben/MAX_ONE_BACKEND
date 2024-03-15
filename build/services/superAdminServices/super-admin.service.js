"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSuperAdmin = void 0;
const tslib_1 = require("tslib");
const uuid_1 = require("uuid");
const super_admin_entity_1 = tslib_1.__importDefault(require("../../entities/super-admin-entity"));
const helpers_1 = require("../../helperFunctions/helpers");
const validations_1 = require("../../validators/validations");
const createSuperAdmin = async (request, response) => {
    try {
        const { first_name, last_name, email, phone, password, confirm_password } = request.body;
        const validate = await validations_1.registerAdminSchema.validateAsync(request.body);
        if (validate.error) {
            console.log("error", validate);
            return response.status(400).json({
                Error: validate.error.details[0].message,
            });
        }
        if (password !== confirm_password) {
            return response.status(400).json({
                status: "error",
                message: "Password mismatch"
            });
        }
        const newPassword = await (0, helpers_1.hashPassword)(password);
        const newAdmin = await super_admin_entity_1.default.create({
            id: (0, uuid_1.v4)(),
            first_name,
            last_name,
            email,
            phone,
            password: newPassword
        });
        const newAdminInstance = await super_admin_entity_1.default.findOne({ where: { id: newAdmin.id } });
        if (!newAdminInstance) {
            return response.status(400).json({
                status: "error",
                message: "Something went wrong"
            });
        }
        response.status(200).json({
            status: "success",
            message: "Super Admin created successfully",
            newAdminInstance
        });
    }
    catch (error) {
        return response.status(500).json({
            status: "error",
            message: `Internal Server Error: ${error}`
        });
    }
};
exports.createSuperAdmin = createSuperAdmin;
//# sourceMappingURL=super-admin.service.js.map