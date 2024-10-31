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

//- Return Pubilc room
const publicRooms = () => {
  const {
    sockets: {
      adapter: { rooms, sids },
    },
  } = ioServer;
  const publicRooms = [];
  rooms.forEach((_, key) => {
    if (sids.get(key) === undefined) {
      publicRooms.push(key);
    }
  });
  return publicRooms;
};

//- Return room user count
const roomUserCount = (roomName) => {
  return ioServer.sockets.adapter.rooms.get(roomName)?.size;
};

//-SocketIO server connect
ioServer.on("connection", (socket) => {
  socket.on("enterRoom", (roomName, enterName, showRoom) => {
    socket.nickname = enterName;
    socket.join(roomName);
    showRoom();
    ioServer.sockets.emit("editRooms", publicRooms());
    socket.on("editNickname", (nickname) => {
      ioServer.to(roomName).emit("editNickname", socket.nickname, nickname);
      socket.nickname = nickname;
    });

    ioServer
      .to(roomName)
      .emit("welcome", socket.nickname, roomUserCount(roomName));

    socket.on("disconnecting", () => {
      socket.rooms.forEach((roomName) => {
        socket
          .to(roomName)
          .emit("bye", socket.nickname, roomUserCount(roomName) - 1);
      });
    });
    socket.on("newMessage", (chatMessage, roomName, done) => {
      socket.to(roomName).emit("newMessage", chatMessage, socket.nickname);
      done();
    });
    socket.on("disconnect", () => {
      ioServer.sockets.emit("editRooms", publicRooms());
    });
  });
});

httpServer.listen(PORT, handleServerListen);
