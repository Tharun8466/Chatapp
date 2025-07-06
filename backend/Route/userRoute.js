import express from 'express';
import isLogin from '../middleWare/isLogin.js';
import { getCurrentChatters, getUserBySearch } from '../RouteControllers/userHandlerController.js';

const router = express.Router();

router.get('/search',isLogin,getUserBySearch);

router.get('/currentchatters',isLogin,getCurrentChatters);

export default router