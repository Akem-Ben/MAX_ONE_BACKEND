import express from 'express';
import { getAllProspectsSorted } from '../../services/usersServices/getAllUsers';
import { getTotalUsersByStages } from '../../services/usersServices/getTotalUsers';



const router = express.Router()


router.get('/get-all', getAllProspectsSorted);
router.get('/users-by-stages', getTotalUsersByStages)


export default router;