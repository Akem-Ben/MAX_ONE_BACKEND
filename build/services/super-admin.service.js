"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuperAdmiService = void 0;
const uuid_1 = require("uuid");
const typeorm_1 = require("typeorm");
const super_admin_entity_1 = require("../entities/super-admin.entity");
class SuperAdmiService {
    async createSuperAdmin(request, response) {
        const userRepository = (0, typeorm_1.getRepository)(super_admin_entity_1.SuperAdmin);
        try {
            const { first_name, last_name, email, phone, password, confirm_password } = request.body;
            if (password !== confirm_password) {
                return response.status(400).json({
                    status: "error",
                    message: "Password mismatch"
                });
            }
            const newAdmin = userRepository.create({
                id: (0, uuid_1.v4)(),
                first_name,
                last_name,
                email,
                phone,
                password
            });
            const confirm = await userRepository.save(newAdmin);
            if (!confirm) {
                return response.status(400).json({
                    status: "error",
                    message: "Something went wrong"
                });
            }
            response.status(200).json({
                status: "success",
                message: "Super Admin created successfully",
                newAdmin
            });
        }
        catch (error) {
            return response.status(500).json({
                status: "error",
                message: `Internal Server Error: ${error}`
            });
        }
    }
}
exports.SuperAdmiService = SuperAdmiService;
//# sourceMappingURL=super-admin.service.js.map