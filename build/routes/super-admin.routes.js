"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const super_admin_service_1 = require("../services/super-admin.service");
const router = express_1.default.Router();
const superAdminInstance = new super_admin_service_1.SuperAdmiService();
router.post('/create-superadmin', superAdminInstance.createSuperAdmin);
exports.default = router;
//# sourceMappingURL=super-admin.routes.js.map