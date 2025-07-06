import express from 'express';
import dotenv from 'dotenv';
import dbConnect from "./DB/dbConnect.js"
import authRouter from './Route/authUser.js'
import messageRouter from './Route/messageRout.js'
import cookieParser from "cookie-parser"
import userRouter from './Route/userRoute.js'
import {app,server} from './socket/socket.js'
import cors from 'cors';
import path from 'path';

const __dirname = path.resolve();

dotenv.config();

// const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth',authRouter)
app.use('/api/message',messageRouter)
app.use('/api/user',userRouter)

app.use(express.static(path.join(__dirname,"/frontend/dist")))

app.get(/^\/(?!api).*/,(req,res)=>{
    res.sendFile(path.join(__dirname,"frontend","dist","index.html"))
})

app.get('/', (req, res) => {
    res.send("Server is Working");
});



server.listen(port, () => {
    dbConnect();
    console.log(`Working at ${port}`);
});