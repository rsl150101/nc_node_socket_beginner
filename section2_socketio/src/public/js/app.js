//- Connect server
const socket = io();

//- DOM
const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");

//- Handle DOM event
const handleRoomSubmit = (e) => {
  e.preventDefault();
  const input = form.querySelector("input");
  socket.emit("enterRoom", { payload: input.value }, () => {
    console.log("received");
  });
  input.value = "";
};

form.addEventListener("submit", handleRoomSubmit);
