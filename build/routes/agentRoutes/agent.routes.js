"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const agentLogin_1 = require("../../services/agentServices/agentLogin");
const authorizationFunctions_1 = require("../../middlewares/authorizationFunctions");
const createUser_1 = require("../../services/usersServices/createUser");
const router = express_1.default.Router();
router.post('/agent-login', agentLogin_1.loginAgent);
router.post('/create-prospect', authorizationFunctions_1.generalAuthorisationFunction, createUser_1.createProspect);
exports.default = router;
