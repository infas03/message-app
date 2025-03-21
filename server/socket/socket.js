import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: [`${process.env.URL_DOMAIN}`, "http://localhost:3000"],
		methods: ["GET", "POST", "PATCH"],
	},
});

export const getReceiverSocketId = (receiverId) => {
	return userSocketMap[receiverId];
};

const userSocketMap = {};

io.on("connection", (socket) => {
	console.log("a user connected", socket.id);

	const userId = socket.handshake.query.userId;
	console.log("User ID from handshake:", userId);
	if (userId && userId !== "undefined") {
        userSocketMap[userId] = socket.id;
        console.log(`Socket ID mapped for User ID ${userId}: ${socket.id}`);
    }

	io.emit("getOnlineUsers", Object.keys(userSocketMap));

	socket.on("disconnect", () => {
		console.log("user disconnected", socket.id);
		delete userSocketMap[userId];
		io.emit("getOnlineUsers", Object.keys(userSocketMap));
	});
});

export { app, io, server };