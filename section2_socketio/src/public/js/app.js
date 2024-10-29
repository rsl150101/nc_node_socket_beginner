//- Connect server
const socket = io();

//- DOM
const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");
const room = document.getElementById("room");

room.hidden = true;

let roomName;

const showRoom = () => {
  welcome.hidden = true;
  room.hidden = false;
  const roomTitle = room.querySelector("h3");
  roomTitle.innerText = `Room #${roomName}`;
};

//- Handle DOM event
const handleRoomSubmit = (e) => {
  e.preventDefault();
  const input = form.querySelector("input");
  roomName = input.value;
  socket.emit("enterRoom", roomName, showRoom);
  input.value = "";
};

form.addEventListener("submit", handleRoomSubmit);
