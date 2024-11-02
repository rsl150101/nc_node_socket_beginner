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

ioServer.on("connection", (socket) => {
  socket.on("joinRoom", (roomName) => {
    socket.join(roomName);
    socket.to(roomName).emit("welcome");
  });
  socket.on("offer", (offer, roomName) => {
    socket.to(roomName).emit("offer", offer);
  });
  socket.on("answer", (answer, roomName) => {
    socket.to(roomName).emit("answer", answer);
  });
});

httpServer.listen(PORT, handleServerListen);
