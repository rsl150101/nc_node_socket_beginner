import express from "express";

const app = express();
const PORT = 5000;

app.set("view engine", "pug");
app.set("views", __dirname + "/src/views");

const handleServerListen = () => {
  console.log(`Listening on http://localhost:${PORT}`);
};

app.listen(PORT, handleServerListen);
