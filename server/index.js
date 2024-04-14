import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();

const server = createServer(app);

const io = new Server(server,{
    cors : "*"
});

io.on("connection",(socket) => {
    console.log(`User connected with id : ${socket.id}`);
    io.to(socket.id).emit("getId",{ id: socket.id });

    socket.on("connected",({ name }) => {
        socket.broadcast.emit("connecting",{ name });
    })

    socket.on("message",({ name, message, Id }) => {
        io.emit("receive-message",{ name, message, Id });
    })

})

const PORT = process.env.PORT || 8001;
server.listen(PORT,() => {
    console.log(`Server is running on PORT : ${PORT}`);
})