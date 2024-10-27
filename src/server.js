import express from "express";

const app = express();
const PORT = 5000;

//- view engine set
app.set("view engine", "pug");
app.set("views", __dirname + "/views"); //* path set

//- static set
app.use("/public", express.static(__dirname + "/public")); //* static file serve for express middleware

//- router set
app.get("/", (_, res) => res.render("home")); //* home page render

//- server listen
const handleServerListen = () => {
  console.log(`Listening on http://localhost:${PORT}`);
};

app.listen(PORT, handleServerListen);
