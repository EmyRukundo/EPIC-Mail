import express from 'express';
import {getGroups,createGroup,updateGroup,specificGroup} from '../controllers/groups';
import verifyToken from '../middleware/authenticate';
import groupValidate from '../helpers/validation/groups';
const router = express.Router();

const { validate} = groupValidate;

router.get('/',getGroups);
router.get('/:id',specificGroup);
router.patch('/:id/name',updateGroup);
router.post('/groups', validate, verifyToken,createGroup);




export default router;