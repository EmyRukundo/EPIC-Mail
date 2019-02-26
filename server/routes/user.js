import express from 'express';

import signUp from '../controllers/signUp';



const router = express.Router();


router.post('/signup',signUp);


export default router;