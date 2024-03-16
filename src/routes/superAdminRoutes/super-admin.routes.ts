import express from 'express';
import { createSuperAdmin } from '../../services/superAdminServices/superAdminRegister.service';
import { loginSuperAdmin } from '../../services/superAdminServices/superAdminLogin';
import { superAdminAuthorizationFunction } from '../../middlewares/authorizationFunctions';
import { createAgent } from '../../services/superAdminServices/superAdminCreatesAgent';
import { getAllAgents } from '../../services/agentServices/getAllAgents';

const router = express.Router()

router.post('/create-superadmin', createSuperAdmin);
router.post('/login', loginSuperAdmin)
router.post('/create-agent', superAdminAuthorizationFunction, createAgent)
router.get('/allagents', getAllAgents)

export default router;