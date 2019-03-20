import express from 'express';
import {getGroups,createGroup,updateGroup,specificGroup,groupMember,deleteGroup} from '../controllers/groups';
const router = express.Router();

 

router.get('/',getGroups);
router.post('/',createGroup);
router.get('/:id',specificGroup);
router.patch('/:id/name',updateGroup);
router.delete('/:id',deleteGroup);
router.post('/:groupid/user',groupMember);



export default router;