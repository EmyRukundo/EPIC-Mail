import express from 'express';
import {getGroups,createGroup,updateGroup,specificGroup,groupMember,deleteGroup,deleteMember,emailGroup} from '../controllers/groups';
import verifyToken from '../middleware/authenticate';
import groupValidate from '../helpers/validation/groups';

const router = express.Router();

const { validate,validateMember,validateEmail} = groupValidate;
 

router.get('/',verifyToken,getGroups);
router.post('/',validate,verifyToken,createGroup);
router.get('/:id',verifyToken,specificGroup);
router.patch('/:id/name',verifyToken,updateGroup);
router.delete('/:id',verifyToken,deleteGroup);
router.post('/:groupid/user',verifyToken,validateMember,groupMember);
router.delete('/:groupid/users/:id',verifyToken,deleteMember);
router.post('/:id/message',validateEmail,emailGroup)


export default router;