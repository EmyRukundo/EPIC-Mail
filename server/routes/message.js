import express from 'express';
import {createMessage,unreadMessage,sentMessage,deleteEmail,specificEmail} from '../controllers/message';
import verifyToken from '../middleware/authenticate';
import messageValidate from '../helpers/validation/messages';


const { validate} = messageValidate;
const router = express.Router();

router.get('/:id',verifyToken,specificEmail);
// router.get('/',verifyToken,getMessages);
router.get('/unread',unreadMessage);
router.get('/:sent',sentMessage);
router.post('/',validate,verifyToken,createMessage);
router.delete('/:id/delete',deleteEmail);


export default router;




