import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";
import { createServer } from "http";
import { initSocket } from "./socket/socket.js";

dotenv.config();

connectDB();

const server = createServer(app);

const io = initSocket(server);

io.on("connection",(socket)=>{

    console.log("User Connected",socket.id);

    socket.on("join-room",(chatId)=>{
        socket.join(chatId);
        console.log(`Joined ${chatId}`);
    });

});

server.listen(process.env.PORT,()=>{
    console.log("Server Running");
});