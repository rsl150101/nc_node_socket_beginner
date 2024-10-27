import express from "express";
import http from "http";
import WebSocket from "ws";

const app = express();
const PORT = 5000;

//- Set view engine
app.set("view engine", "pug");
app.set("views", __dirname + "/views"); //* Set path

//- Set static file serving
app.use("/public", express.static(__dirname + "/public")); //* Serve static files with express middleware

//- Set up router
app.get("/", (_, res) => res.render("home")); //* Render home page
app.get("/*", (_, res) => res.redirect("/")); //* Redirect all other URLs to "/"

//- server listen fn
const handleServerListen = () => {
  console.log(`Listening on http://localhost:${PORT}`);
};

//! You can create a WebSocket server independently without an HTTP server,
//! but to run the server on a single port, you should write it like this.
//- http server
const server = http.createServer(app);

//- WebSocket server
const wss = new WebSocket.Server({ server }); //* Create a WebSocket server by passing the HTTP server instance. This allows both servers to operate on the same port.

//- Handle event when client connect WebSocket server
wss.on("connection", (socket) => {
  socket.send("hello client"); //* WebSocket server send message object to client
  socket.on("message", (message) => {
    console.log(message.toString());
  }); //* Handle message when client send message to WebSocket server
});

//- server listen
server.listen(PORT, handleServerListen);
