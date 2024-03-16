"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const superAdminRegister_service_1 = require("../../services/superAdminServices/superAdminRegister.service");
const superAdminLogin_1 = require("../../services/superAdminServices/superAdminLogin");
const router = express_1.default.Router();
router.post("/create-superadmin", superAdminRegister_service_1.createSuperAdmin);
router.post("/login", superAdminLogin_1.loginSuperAdmin);
exports.default = router;
