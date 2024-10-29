import express from "express";

const app = express();
const PORT = 5000;

const handleServerListen = () => {
  console.log(`Listening on http://localhost:${PORT}`);
};

app.listen(PORT, handleServerListen);
