"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const superAdminRegister_service_1 = require("../services/superAdminServices/superAdminRegister.service");
const router = express_1.default.Router();
router.post('/create-superadmin', superAdminRegister_service_1.createSuperAdmin);
exports.default = router;
//# sourceMappingURL=super-admin.routes.js.map