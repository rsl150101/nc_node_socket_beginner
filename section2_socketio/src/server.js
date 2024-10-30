import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const PORT = 5000;

//- Set view engine
app.set("view engine", "pug");
app.set("views", __dirname + "/views");

//- Set static file serving
app.use("/public", express.static(__dirname + "/public"));

//- Set up router
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

const handleServerListen = () => {
  console.log(`Listening on http://localhost:${PORT}`);
};

//- Create server
const httpServer = http.createServer(app);
const ioServer = new Server(httpServer);

//-SocketIO server connect
ioServer.on("connection", (socket) => {
  socket.on("enterRoom", (roomName, enterName, showRoom) => {
    socket.nickname = enterName;
    socket.join(roomName);
    showRoom();

    socket.on("editNickname", (nickname) => {
      ioServer.to(roomName).emit("editNickname", socket.nickname, nickname);
      socket.nickname = nickname;
    });

    ioServer.to(roomName).emit("welcome", socket.nickname);
    socket.on("disconnecting", () => {
      socket.rooms.forEach((roomName) => {
        socket.to(roomName).emit("bye", socket.nickname);
      });
    });
    socket.on("newMessage", (chatMessage, roomName, done) => {
      socket.to(roomName).emit("newMessage", chatMessage, socket.nickname);
      done();
    });
  });
});

httpServer.listen(PORT, handleServerListen);
