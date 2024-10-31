const socket = io();

const enterRoomDiv = document.querySelector("#enterRoom");
const chatDiv = document.querySelector("#chat");
const enterRoomForm = enterRoomDiv.querySelector("form");
const msgForm = chatDiv.querySelector("#msg");
const editNicknameForm = chatDiv.querySelector("#editNickname");

chatDiv.hidden = true;

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
  socket.emit("enterRoom", roomNameInput.value, nicknameInput.value);
};

socket.on("editRoomList", handleRoomList);
enterRoomForm.addEventListener("submit", handleEnterRoomSubmit);
