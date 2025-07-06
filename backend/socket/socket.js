import { Server} from "socket.io";
import http from 'http';
import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors({
  origin: "https://tharun-chatapp.onrender.com",
  methods: ["GET", "POST"],
  credentials: true
}));

const server=http.createServer(app);
const io = new Server(server,{
    cors:{
        origin:['https://tharun-chatapp.onrender.com'],
        methods:["GET","POST"],

    }
});

export const getReceiverSocketId = (recerverId)=>{
    return userSocketmap[recerverId];
}

const userSocketmap={}; //{userid,socketid}

io.on('connection',(socket)=>{
    const userId = socket.handshake.query.userId;
    if(userId!=="undefined") userSocketmap[userId]=socket.id;
    io.emit("getOnlineUsers",Object.keys(userSocketmap));

    socket.on('disconnect',()=>{
        delete userSocketmap[userId],
        io.emit('getOnlineUsers',Object.keys(userSocketmap));
    })
})

export {app,io,server};