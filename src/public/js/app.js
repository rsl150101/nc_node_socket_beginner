//- DOM
const messageList = document.querySelector("ul");
const messageForm = document.querySelector("#message");
const nickForm = document.querySelector("#nick");

//- Connet WebSocket server and Make WebSocket Object
const socket = new WebSocket(`ws://${window.location.host}`);

//- Convert to JSON string
const makeMessage = (type, message) => {
  const msg = { type, message };
  return JSON.stringify(msg);
};

//- Handle message Object from WebSocket server
socket.addEventListener("message", (message) => {
  const li = document.createElement("li");
  li.innerText = message.data;
  messageList.append(li);
});

//// Send message to WebSocket server
//// socket.addEventListener("open", () => {
////   socket.send("hello server");
//// });

//- Handle DOM event
const handleMessageSubmit = (e) => {
  e.preventDefault();
  const input = messageForm.querySelector("input");
  socket.send(makeMessage("chat", input.value));
  input.value = "";
};

const handleNickSumbmit = (e) => {
  e.preventDefault();
  const input = nickForm.querySelector("input");
  socket.send(makeMessage("nickname", input.value));
};

//- DOM event
messageForm.addEventListener("submit", handleMessageSubmit);
nickForm.addEventListener("submit", handleNickSumbmit);
