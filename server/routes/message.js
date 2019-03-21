import express from 'express';
import {getMessages,createMessage,unreadMessage,sentMessage,deleteEmail,specificEmail} from '../controllers/message';
import verifyToken from '../middleware/authenticate';
import messageValidate from '../helpers/validation/messages';


const { validate} = messageValidate;
const router = express.Router();

router.get('/:id',verifyToken,specificEmail);
router.get('/',verifyToken,getMessages);
router.get('/unread',verifyToken,unreadMessage);
router.get('/sent',verifyToken,sentMessage);
router.post('/',validate,verifyToken,createMessage);
router.delete('/:id/delete',verifyToken,deleteEmail);


export default router;




