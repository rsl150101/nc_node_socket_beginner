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

socket.addEventListener("message", (msg) => {
  const parsedMsg = JSON.parse(msg.data);
  const li = document.createElement("li");
  li.innerText = `${parsedMsg.nickname}: ${parsedMsg.msg}`;
  messageList.append(li);
});

chatForm.addEventListener("submit", handleChatSubmit);
