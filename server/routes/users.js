import express from 'express';
import {loginUser,signupUser,getUsers} from '../controllers/users.js';
import userValidate from '../helpers/validation/users';


const { validate,validatelogin} = userValidate;
const router = express.Router();

router.get('/getUsers',getUsers);
router.post('/signup',validate,signupUser);
router.post('/login',validatelogin,loginUser);

export default router;