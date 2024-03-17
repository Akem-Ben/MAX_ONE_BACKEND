"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getAllUsers_1 = require("../../services/usersServices/getAllUsers");
const getTotalUsers_1 = require("../../services/usersServices/getTotalUsers");
const reassignAProspectToAnAgent_1 = require("../../services/usersServices/reassignAProspectToAnAgent");
const reassignAllProspectsOfAnAgent_1 = require("../../services/usersServices/reassignAllProspectsOfAnAgent");
const getUsersInAStage_1 = require("../../services/usersServices/getUsersInAStage");
const authorizationFunctions_1 = require("../../middlewares/authorizationFunctions");
const createUser_1 = require("../../services/usersServices/createUser");
const router = express_1.default.Router();
//All routes are protected and can be accessed by both super admin and agents
router.get("/get-all", authorizationFunctions_1.generalAuthorisationFunction, getAllUsers_1.getAllProspectsSorted);
router.get("/users-by-stages", authorizationFunctions_1.generalAuthorisationFunction, getTotalUsers_1.getTotalUsersByStages);
router.post("/reassign_one_prospect/:userId", authorizationFunctions_1.generalAuthorisationFunction, reassignAProspectToAnAgent_1.reassignAProspectToAnAgent);
router.post("/reassign_all_prospects/:oldAgentId", authorizationFunctions_1.generalAuthorisationFunction, reassignAllProspectsOfAnAgent_1.reassignAllProspectsOfAnAgent);
router.get("/get_by_single_stage_and_channel", authorizationFunctions_1.generalAuthorisationFunction, getUsersInAStage_1.getAllUserByStageAndChannel);
router.post("/create-prospect", authorizationFunctions_1.generalAuthorisationFunction, createUser_1.createProspect);
exports.default = router;
