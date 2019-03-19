import express from 'express';
import {getGroups,createGroup,updateGroup,specificGroup} from '../controllers/groups';
const router = express.Router();



router.get('/',getGroups);
router.post('/',createGroup);
router.get('/:id',specificGroup);
router.patch('/:id/name',updateGroup);



export default router;