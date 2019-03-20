import express from 'express';
import {getGroups,createGroup,updateGroup,specificGroup,groupMember,deleteGroup} from '../controllers/groups';
import verifyToken from '../middleware/authenticate';
import groupValidate from '../helpers/validation/groups';

const router = express.Router();

const { validate} = groupValidate;
 

router.get('/',getGroups);
router.post('/',createGroup);
router.get('/:id',specificGroup);
router.patch('/:id/name',updateGroup);
router.delete('/:id',deleteGroup);
router.post('/:groupid/user',groupMember);
router.post('/groups', validate, verifyToken,createGroup);


export default router;