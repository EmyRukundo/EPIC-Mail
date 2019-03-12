import express from 'express';

// import {createMessage} from '../controllers/createMessage';
// import getMessages from '../controllers/messages';
// import unreadMessage from '../controllers/unreadMessage';
// import sentMessage from '../controllers/sentMessage';
import {getMessages,createMessage,unreadMessage,sentMessage} from '../controllers/message';
const router = express.Router();

router.get('/messages',getMessages);
router.get('/message/unread',unreadMessage);
router.get('/message/:status',sentMessage);
router.post('/messages',createMessage);


export default router;