import express from 'express';
import {getGroups,createGroup} from '../controllers/groups';
import verifyToken from '../middleware/authenticate';
import groupValidate from '../helpers/validation/groups';


const { validate} = groupValidate;

router.get('/',getGroups);

const router = express.Router();

router.post('/groups', validate, verifyToken,createGroup);



export default router;