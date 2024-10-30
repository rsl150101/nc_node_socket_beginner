//- Connect server
const socket = io();

//- DOM
const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");
const room = document.getElementById("room");

room.hidden = true;

let roomName;

const handleChatSubmit = (chat) => (e) => {
  e.preventDefault();
  const input = chat.querySelector("input");
  const chatMessage = input.value;
  socket.emit("newMessage", chatMessage, roomName, () => {
    addMessage(`You : ${chatMessage}`);
  });
  input.value = "";
};

const showRoom = () => {
  welcome.hidden = true;
  room.hidden = false;
  const roomTitle = room.querySelector("h3");
  roomTitle.innerText = `Room #${roomName}`;
  const chat = room.querySelector("form");
  chat.addEventListener("submit", handleChatSubmit(chat));
};

const addMessage = (msg) => {
  const messageList = room.querySelector("ul");
  const li = document.createElement("li");
  li.innerText = msg;
  messageList.appendChild(li);
};

//- Handle DOM event
const handleRoomSubmit = (e) => {
  e.preventDefault();
  const input = form.querySelector("input");
  roomName = input.value;
  socket.emit("enterRoom", roomName, showRoom);
  input.value = "";
};

socket.on("welcome", (socketId) => {
  addMessage(`${socketId} joined!`);
});

socket.on("bye", (socketId) => {
  addMessage(`${socketId} left.`);
});

socket.on("newMessage", (chatMessage, socketId) => {
  addMessage(`${socketId} : ${chatMessage}`);
});

form.addEventListener("submit", handleRoomSubmit);
