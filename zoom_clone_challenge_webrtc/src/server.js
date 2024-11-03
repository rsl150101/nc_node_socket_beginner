import express from "express";
import http from "http";
import SocketIO from "socket.io";

const app = express();
const PORT = 5000;

const handleServerListen = () => {
  console.log(`Listening on http://localhost:${PORT}`);
};

const httpServer = http.createServer(app);
const ioServer = SocketIO(httpServer);

ioServer.on("connection", (socket) => {});

httpServer.listen(PORT, handleServerListen);
