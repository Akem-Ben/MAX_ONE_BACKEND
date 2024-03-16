import express from "express";
import { createSuperAdmin } from "../../services/superAdminServices/superAdminRegister.service";
import { loginSuperAdmin } from "../../services/superAdminServices/superAdminLogin";


const router = express.Router();

router.post("/create-superadmin", createSuperAdmin);
router.post("/login", loginSuperAdmin);

export default router;
