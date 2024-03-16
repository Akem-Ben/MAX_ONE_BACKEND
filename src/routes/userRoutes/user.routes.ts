import express from 'express';
import { getAllProspectsSorted } from '../../services/usersServices/getAllUsers';
import { getTotalUsersByStages } from '../../services/usersServices/getTotalUsers';
import { reassignAProspectToAnAgent } from '../../services/usersServices/reassignAProspectToAnAgent';
import { reassignAllProspectsOfAnAgent } from '../../services/usersServices/reassignAllProspectsOfAnAgent';
import { getAllUserByStageAndChannel } from '../../services/usersServices/getUsersInAStage';



const router = express.Router()


router.get('/get-all', getAllProspectsSorted);
router.get('/users-by-stages', getTotalUsersByStages)
router.post('/reassign-one-prospect/:userId', reassignAProspectToAnAgent)
router.post('/reassign-all-prospects/:oldAgentId', reassignAllProspectsOfAnAgent)
router.get('/get-by-single-stage-and-channel', getAllUserByStageAndChannel)


export default router;