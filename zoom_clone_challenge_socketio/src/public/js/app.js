const socket = io();

const enterRoomDiv = document.querySelector("#enterRoom");
const chatDiv = document.querySelector("#chat");
const enterRoomForm = enterRoomDiv.querySelector("form");
const msgForm = chatDiv.querySelector("#msg");
const editNicknameForm = chatDiv.querySelector("#editNickname");

chatDiv.hidden = true;

const handleMsgForm = (e) => {
  e.preventDefault();
  const msgInput = msgForm.querySelector("input");
  socket.emit("newMessage", msgInput.value);
  addMsg(`You : ${msgInput.value}`);
  msgInput.value = "";
};

const showChat = () => {
  enterRoomDiv.hidden = true;
  chatDiv.hidden = false;
  const editNicknameInput = editNicknameForm.querySelector("input");

  msgForm.addEventListener("submit", handleMsgForm);
};

const handleRoomList = (roomArr) => {
  const roomList = enterRoomDiv.querySelector("ul");
  Array.from(roomList.children).forEach((li) => {
    li.remove();
  });
  roomArr.forEach((room) => {
    const li = document.createElement("li");
    li.innerText = room;
    roomList.append(li);
  });
};

const handleEnterRoomSubmit = (e) => {
  e.preventDefault();

  const roomNameInput = enterRoomForm.querySelector("#roomName");
  const nicknameInput = enterRoomForm.querySelector("#nickname");
  socket.emit("enterRoom", roomNameInput.value, nicknameInput.value, showChat);
};

const handleRoomTitle = (roomName) => {
  const title = chatDiv.querySelector("h2");
  title.innerText = roomName;
};

const addMsg = (msg) => {
  const msgList = chatDiv.querySelector("ul");
  const li = document.createElement("li");
  li.innerText = msg;
  msgList.append(li);
};

socket.on("editRoomList", handleRoomList);
socket.on("welcome", (roomName, nickname) => {
  handleRoomTitle(roomName);
  addMsg(`${nickname} joined!`);
});
socket.on("bye", (nickname) => {
  addMsg(`${nickname} left.`);
});
socket.on("newMessage", (nickname, msg) => {
  addMsg(`${nickname} : ${msg}`);
});

enterRoomForm.addEventListener("submit", handleEnterRoomSubmit);
