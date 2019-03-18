import express from 'express';
import {loginUser,signupUser} from '../controllers/users';
import userValidate from '../helpers/validation/users';


const { validate,validatelogin} = userValidate;
const router = express.Router();


router.post('/signup',validate,signupUser);
router.post('/login',validatelogin,loginUser);

export default router;