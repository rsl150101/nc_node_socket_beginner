import express from "express";
import http from "http";
import WebSocket from "ws";

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
const webSocketServer = new WebSocket.Server({ server: httpServer });

httpServer.listen(PORT, handleServerListen);
