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
  console.log(socket);
});

httpServer.listen(PORT, handleServerListen);
