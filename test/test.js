// test.js

// import { io } from "socket.io-client";

// const socket = io("http://localhost:3000");

// --- test for socket.io server connection and join room event ---

// import { io } from "socket.io-client";

// const socket = io("http://localhost:3000");

// socket.emit(
//     "join-room",
//     "123"
// );


//--- test for send message event ---

import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

socket.on("connect", () => {
    console.log("Connected:", socket.id);

    socket.emit(
        "join-room",
        "6a8734d1e69a1a58cb34c005" // Replace with a valid chatId from your database
    );
});

socket.on("receive-message", (message) => {
    console.log("NEW MESSAGE:");
    console.log(message);
});