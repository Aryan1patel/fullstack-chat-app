import {Server} from 'socket.io';
import http from 'http';
import express from 'express';

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors:{
        origin :["http://localhost:5173"],
    }
});

export function getReceiverSocketId(userId){

    return userSocketMap[userId]
}

// use to store the socket id of the user or online user
const userSocketMap ={}



io.on("connection", (socket) => {
    console.log("A user connected", socket.id);

    const userId = socket.handshake.query.userId;

    if(userId){
        userSocketMap[userId] = socket.id 
    }

    // io.emit() will emit the event to all the connected users
    io.emit("getOnlineUsers", Object.keys(userSocketMap))     // using this here we can get the online users



    // New message event from the sender to the receiver
    socket.on("sendMessage", (newMessage) => {

        const receiverSocketId = userSocketMap[newMessage.receiverId];
       
        if (receiverSocketId) {io.to(receiverSocketId).emit("newMessage", newMessage);}  // call newMessage function from socket

    });
    
    
        socket.on("disconnect", () => {
            
            console.log("A user disconnected", socket.id);
            delete userSocketMap[userId];
            io.emit("getOnlineUsers", Object.keys(userSocketMap))
        })
    


})

export {io,app,server};