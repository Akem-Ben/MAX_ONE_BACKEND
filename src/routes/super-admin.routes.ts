import express from 'express';
import { createSuperAdmin } from '../services/superAdminServices/superAdminRegister.service';

const router = express.Router()

router.post('/create-superadmin', createSuperAdmin);

export default router;