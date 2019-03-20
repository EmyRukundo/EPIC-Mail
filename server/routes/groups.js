import express from 'express';
import createGroup from '../controllers/groups';
import verifyToken from '../middleware/authenticate';
import groupValidate from '../helpers/validation/groups';


const { validate} = groupValidate;


const router = express.Router();

router.post('/groups', validate, verifyToken,createGroup);


export default router;