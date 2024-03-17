import express from "express";
import { loginAgent } from "../../services/agentServices/agentLogin";
import { superAdminAuthorizationFunction } from "../../middlewares/authorizationFunctions";
import { createAgent } from "../../services/agentServices/superAdminCreatesAgent";
import { getAllAgents } from "../../services/agentServices/getAllAgents";

const router = express.Router();

router.post("/agent-login", loginAgent);

//Protected routes that are only accessed by superadmin and not the agent
router.post("/create-agent", superAdminAuthorizationFunction, createAgent);
router.get("/allagents", superAdminAuthorizationFunction, getAllAgents);

export default router;
