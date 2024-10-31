import express from "express";
import http from "http";
import SocketIO from "socket.io";

const app = express();
const PORT = 5000;

app.set("view engine", "pug");
app.set("views", __dirname + "/views");

app.use("/public", express.static(__dirname + "/public"));

app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

const handleServerListen = () => {
  console.log(`Listening on http://localhost:${PORT}`);
};

const httpServer = http.createServer(app);
const ioServer = SocketIO(httpServer);

const pulbicRoomList = () => {
  const {
    sockets: {
      adapter: { rooms, sids },
    },
  } = ioServer;
  const pulbicRoomArr = [];
  rooms.forEach((_, key) => {
    if (sids.get(key) === undefined) {
      pulbicRoomArr.push(key);
    }
  });
  return pulbicRoomArr;
};

ioServer.on("connection", (socket) => {
  ioServer.sockets.emit("editRoomList", pulbicRoomList());

  socket.on("enterRoom", (roomName, nickname) => {
    socket.join(roomName);
    ioServer.sockets.emit("editRoomList", pulbicRoomList());
  });
});

httpServer.listen(PORT, handleServerListen);
