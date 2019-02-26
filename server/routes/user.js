import express from 'express';

import {getUsers,login,signUp} from '../controllers/users';

const router = express.Router();

router.get('/getUsers',getUsers);
router.post('/signup',signUp);
router.post('/login',login);

export default router;