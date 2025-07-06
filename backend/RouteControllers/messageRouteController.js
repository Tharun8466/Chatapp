import Message from "../Models/messageSchema.js";
import Conversation from "../Models/conversationModels.js";
import { getReceiverSocketId,io } from "../socket/socket.js";


export const sendMessage = async(req,res)=>{
    try {
        const {message} = req.body;
        
        const {id:reciverId} = req.params;
        const senderId = req.user._conditions._id;
        let chats = await Conversation.findOne({
            participants:{$all:[senderId,reciverId]}
        })
       
        if(!chats){
            chats =await Conversation.create({
                participants:[senderId,reciverId]  
            })
        }
         console.log(chats);
        
        const newMessages = new Message({
            senderId,
            reciverId,
            message,
            conversationId: chats._id
        })
        console.log(newMessages)
        if (newMessages){
            chats.messages.push(newMessages._id)
        }
        console.log(chats);
        await Promise.all([chats.save(),newMessages.save()]);
        // Socket.io function
        const receiverSocketId =getReceiverSocketId(reciverId);
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage",newMessages);
        }

        res.status(201).send(newMessages)
    } catch (error) {
        console.error(error);
        res.status(500).send({ success:false,message:error });
    }
}

export const getMessages = async(req,res)=>{
    try {
         const {id:reciverId} = req.params;
         const senderId = req.user._conditions._id;
         
         const chats = await Conversation.findOne({participants:{$all:[senderId,reciverId]}}).populate("messages");

         if(!chats) return res.status(200).send([]);

         const messages= chats.messages;
         
         res.status(200).send(messages);
        
    } catch (error) {
        console.error(error);
        res.status(500).send({ success:false,message:error });
    }
}
