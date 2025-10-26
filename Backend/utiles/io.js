import express from "express";
import http from 'http'
import { Server } from 'socket.io';

export const app = express();

export const server = http.createServer(app);


const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"],
        credentials: true
    }
})

io.on('connection', (socket) => {
    socket.on('join-room', (roomId) => {
        socket.join(roomId);
    });

    socket.on('send-message', (msg) => {
        // console.log(msg)
        const seller_id = msg.seller_id;
        const admin_id = msg.admin_id;
        const customer_id = msg.customer_id;
        if (seller_id) {
            io.to(`seller${seller_id}`).emit('receive-msg',msg);
            io.to(`seller${seller_id}`).emit('notify-app',(msg.sender))
            // console.log("sent to seller")
        }
        if (admin_id) {
            io.to(`admin${admin_id}`).emit('receive-msg',msg);
            io.to(`admin${admin_id}`).emit('notify-app',(msg.sender))
            //  console.log("sent to admin")
        }
        if (customer_id) {
            io.to(`customer${customer_id}`).emit('receive-msg',msg);
            io.to(`customer${customer_id}`).emit('notify-app',(msg.sender));
            //  console.log("sent to customer")
        }

    })
})
