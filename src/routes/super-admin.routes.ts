import express from 'express';
import { SuperAdmiService } from '../services/super-admin.service';

const router = express.Router()

const superAdminInstance = new SuperAdmiService()

router.post('/create-superadmin', superAdminInstance.createSuperAdmin);

export default router;