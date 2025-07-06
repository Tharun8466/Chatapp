import express from "express";
import { getMessages, sendMessage } from "../RouteControllers/messageRouteController.js";
import isLogin from "../middleWare/isLogin.js";

const router = express.Router();

router.post('/send/:id',isLogin,sendMessage);

router.get('/:id',isLogin,getMessages);

export default router;
