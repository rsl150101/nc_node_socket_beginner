const socket = io();

const enterRoomDiv = document.querySelector("#enterRoom");
const chatDiv = document.querySelector("#chat");
const enterRoomForm = enterRoomDiv.querySelector("form");
const msgForm = chatDiv.querySelector("#msg");
const editNicknameForm = chatDiv.querySelector("#editNickname");

chatDiv.hidden = true;

const handleEnterRoomSubmit = (e) => {
  e.preventDefault();
  const roomNameInput = enterRoomForm.querySelector("#roomName");
  const nicknameInput = enterRoomForm.querySelector("#nickname");
  socket.emit("enterRoom", roomNameInput.value, nicknameInput.value);
};

enterRoomForm.addEventListener("submit", handleEnterRoomSubmit);
