"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const agentLogin_1 = require("../../services/agentServices/agentLogin");
const authorizationFunctions_1 = require("../../middlewares/authorizationFunctions");
const superAdminCreatesAgent_1 = require("../../services/agentServices/superAdminCreatesAgent");
const getAllAgents_1 = require("../../services/agentServices/getAllAgents");
const router = express_1.default.Router();
router.post("/agent-login", agentLogin_1.loginAgent);
router.post("/create-agent", authorizationFunctions_1.superAdminAuthorizationFunction, superAdminCreatesAgent_1.createAgent);
router.get("/allagents", authorizationFunctions_1.superAdminAuthorizationFunction, getAllAgents_1.getAllAgents);
exports.default = router;
