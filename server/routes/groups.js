import express from 'express';
import createGroup from '../controllers/groups';
import verifyToken from '../middleware/authenticate';

const router = express.Router();




router.post('/groups',verifyToken,createGroup);


export default router;