import express from "express";
import { getAllProspectsSorted } from "../../services/usersServices/getAllUsersSorted";
import { getTotalUsersByStages } from "../../services/usersServices/getTotalUsers";
import { reassignAProspectToAnAgent } from "../../services/usersServices/reassignAUserToAnAgent";
import { reassignAllProspectsOfAnAgent } from "../../services/usersServices/reassignAllUsersOfAnAgent";
import { getAllUserByStageAndChannel } from "../../services/usersServices/getUsersInAStage";
import { generalAuthorisationFunction } from "../../middlewares/authorizationFunctions";
import { createProspect } from "../../services/usersServices/createUser";
import { getAllProspectsUnsorted } from "../../services/usersServices/getAllUsersUnsorted";

const router = express.Router();

//All routes are protected and can be accessed by both super admin and agents
router.get("/get-all", generalAuthorisationFunction, getAllProspectsSorted);
router.get("/users-by-stages", generalAuthorisationFunction, getTotalUsersByStages);
router.post("/reassign_one_prospect/:userId", generalAuthorisationFunction, reassignAProspectToAnAgent);
router.post("/reassign_all_prospects/:oldAgentId", generalAuthorisationFunction, reassignAllProspectsOfAnAgent);
router.get("/get_by_single_stage_and_channel", generalAuthorisationFunction, getAllUserByStageAndChannel);
router.post("/create-prospect", generalAuthorisationFunction, createProspect);
router.get('/get-all-unsorted', generalAuthorisationFunction, getAllProspectsUnsorted)


export default router;
