import express from "express";
import { getAllProspectsSorted } from "../../services/usersServices/getAllUsers";
import { getTotalUsersByStages } from "../../services/usersServices/getTotalUsers";
import { reassignAProspectToAnAgent } from "../../services/usersServices/reassignAProspectToAnAgent";
import { reassignAllProspectsOfAnAgent } from "../../services/usersServices/reassignAllProspectsOfAnAgent";
import { getAllUserByStageAndChannel } from "../../services/usersServices/getUsersInAStage";
import { generalAuthorisationFunction } from "../../middlewares/authorizationFunctions";
import { createProspect } from "../../services/usersServices/createUser";

const router = express.Router();

router.get("/get-all", generalAuthorisationFunction, getAllProspectsSorted);
router.get("/users-by-stages", generalAuthorisationFunction, getTotalUsersByStages);
router.post("/reassign_one_prospect/:userId", generalAuthorisationFunction, reassignAProspectToAnAgent);
router.post("/reassign_all_prospects/:oldAgentId", generalAuthorisationFunction, reassignAllProspectsOfAnAgent);
router.get("/get_by_single_stage_and_channel", generalAuthorisationFunction, getAllUserByStageAndChannel);
router.post("/create-prospect", generalAuthorisationFunction, createProspect);

export default router;
