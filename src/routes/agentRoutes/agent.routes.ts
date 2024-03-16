import express from 'express';
import { loginAgent } from '../../services/agentServices/agentLogin';
import { generalAuthorisationFunction } from '../../middlewares/authorizationFunctions';
import { createProspect } from '../../services/usersServices/createUser';

const router = express.Router()


router.post('/agent-login', loginAgent)
router.post('/create-prospect', generalAuthorisationFunction, createProspect)

export default router;