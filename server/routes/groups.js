import express from 'express';
import {getGroups,createGroup,updateGroup,specificGroup,groupMember,deleteGroup,deleteMember,emailGroup} from '../controllers/groups';
import verifyToken from '../middleware/authenticate';
import groupValidate from '../helpers/validation/groups';

const router = express.Router();

const {validateupdate,validate,validateMember,validateEmail} = groupValidate;
 

router.get('/',verifyToken,getGroups);
router.post('/',validate,verifyToken,createGroup);
router.get('/:id',specificGroup);
router.patch('/:id/name',validateupdate,updateGroup);
router.delete('/:id',deleteGroup);
router.post('/:id/user',validateMember,groupMember);
router.delete('/:groupid/users/:id',deleteMember);
router.post('/:id/message',validateEmail,emailGroup)


export default router;