import express from 'express';
import {getGroups,createGroup} from '../controllers/groups';
const router = express.Router();



router.get('/',getGroups);
router.post('/',createGroup);



export default router;