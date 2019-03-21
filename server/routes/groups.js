import express from 'express';
import {getGroups,createGroup,updateGroup,specificGroup,groupMember,deleteGroup,deleteMember,emailGroup} from '../controllers/groups';
import verifyToken from '../middleware/authenticate';
import groupValidate from '../helpers/validation/groups';

const router = express.Router();

const {validateupdate,validate,validateMember,validateEmail} = groupValidate;
 

router.get('/',verifyToken,getGroups);
router.post('/',validate,verifyToken,createGroup);
router.get('/:id',verifyToken,specificGroup);
router.patch('/:id/name',verifyToken,validateupdate,updateGroup);
router.delete('/:id',verifyToken,deleteGroup);
router.post('/:id/user',verifyToken,validateMember,groupMember);
router.delete('/:groupid/users/:id',verifyToken,deleteMember);
router.post('/:id/message',verifyToken,validateEmail,emailGroup)


export default router;