const chatForm = document.querySelector("form");
const messageList = document.querySelector("ul");

const socket = new WebSocket(`ws://${window.location.host}`);

const convertJSONString = (nickname, msg) => {
  return JSON.stringify({ nickname, msg });
};

const handleChatSubmit = (e) => {
  e.preventDefault();
  const nicknameInput = chatForm.querySelector("#nickname");
  const msgInput = chatForm.querySelector("#msg");
  if (nicknameInput.value === "") {
    nicknameInput.value = "anonymous";
  }
  socket.send(convertJSONString(nicknameInput.value, msgInput.value));
  msgInput.value = "";
};

chatForm.addEventListener("submit", handleChatSubmit);
