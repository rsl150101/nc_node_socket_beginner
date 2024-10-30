//- Connect server
const socket = io();

//- DOM
const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");
const room = document.getElementById("room");

room.hidden = true;

let roomName;

//- Handle DOM event
const handleRoomSubmit = (e) => {
  e.preventDefault();
  const roomInput = form.querySelector("#roomName");
  const nameInput = form.querySelector("#nickname");
  roomName = roomInput.value;
  socket.emit("enterRoom", roomName, nameInput.value, showRoom);
  roomInput.value = "";
};

const handleChatSubmit = (chat) => (e) => {
  e.preventDefault();
  const input = chat.querySelector("input");
  const chatMessage = input.value;
  socket.emit("newMessage", chatMessage, roomName, () => {
    addMessage(`You : ${chatMessage}`);
  });
  input.value = "";
};

const handleEditNicknameSubmit = (editName) => (e) => {
  e.preventDefault();
  const input = editName.querySelector("input");
  socket.emit("editNickname", input.value);
};

const showRoom = () => {
  welcome.hidden = true;
  room.hidden = false;
  const roomTitle = room.querySelector("h3");
  roomTitle.innerText = `Room #${roomName}`;
  const chat = room.querySelector("#chat");
  const editName = room.querySelector("#editNickname");
  chat.addEventListener("submit", handleChatSubmit(chat));
  editName.addEventListener("submit", handleEditNicknameSubmit(editName));
  socket.on("welcome", (nickname) => {
    addMessage(`${nickname} joined!`);
  });
};

const addMessage = (msg) => {
  const messageList = room.querySelector("ul");
  const li = document.createElement("li");
  li.innerText = msg;
  messageList.appendChild(li);
};

socket.on("bye", (nickname) => {
  addMessage(`${nickname} left.`);
});

socket.on("newMessage", (chatMessage, nickname) => {
  addMessage(`${nickname} : ${chatMessage}`);
});

socket.on("editNickname", (prevNickname, nickname) => {
  addMessage(`Rename ${prevNickname} to ${nickname}`);
});

form.addEventListener("submit", handleRoomSubmit);
