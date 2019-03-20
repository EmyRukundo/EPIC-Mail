import express from 'express';
import {getGroups,createGroup,updateGroup,specificGroup,deleteGroup} from '../controllers/groups';
import verifyToken from '../middleware/authenticate';
import groupValidate from '../helpers/validation/groups';

const router = express.Router();

const { validate} = groupValidate;

router.get('/',getGroups);
router.get('/:id',specificGroup);
router.patch('/:id/name',updateGroup);
router.post('/groups', validate, verifyToken,createGroup);
router.delete('/:id',deleteGroup);


export default router;