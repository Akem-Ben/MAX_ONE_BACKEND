"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getAllUsersSorted_1 = require("../../services/usersServices/getAllUsersSorted");
const getTotalUsers_1 = require("../../services/usersServices/getTotalUsers");
const reassignAUserToAnAgent_1 = require("../../services/usersServices/reassignAUserToAnAgent");
const reassignAllUsersOfAnAgent_1 = require("../../services/usersServices/reassignAllUsersOfAnAgent");
const getUsersInAStage_1 = require("../../services/usersServices/getUsersInAStage");
const authorizationFunctions_1 = require("../../middlewares/authorizationFunctions");
const createUser_1 = require("../../services/usersServices/createUser");
const getAllUsersUnsorted_1 = require("../../services/usersServices/getAllUsersUnsorted");
const router = express_1.default.Router();
//All routes are protected and can be accessed by both super admin and agents
router.get("/get-all", authorizationFunctions_1.generalAuthorisationFunction, getAllUsersSorted_1.getAllProspectsSorted);
router.get("/users-by-stages", authorizationFunctions_1.generalAuthorisationFunction, getTotalUsers_1.getTotalUsersByStages);
router.post("/reassign_one_prospect/:userId", authorizationFunctions_1.generalAuthorisationFunction, reassignAUserToAnAgent_1.reassignAProspectToAnAgent);
router.post("/reassign_all_prospects/:oldAgentId", authorizationFunctions_1.generalAuthorisationFunction, reassignAllUsersOfAnAgent_1.reassignAllProspectsOfAnAgent);
router.get("/get_by_single_stage_and_channel", authorizationFunctions_1.generalAuthorisationFunction, getUsersInAStage_1.getAllUserByStageAndChannel);
router.post("/create-prospect", authorizationFunctions_1.generalAuthorisationFunction, createUser_1.createProspect);
router.get('/get-all-unsorted', authorizationFunctions_1.generalAuthorisationFunction, getAllUsersUnsorted_1.getAllProspectsUnsorted);
exports.default = router;
