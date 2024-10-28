//- DOM
const messageList = document.querySelector("ul");
const messageForm = document.querySelector("form");

//- Connet WebSocket server and Make WebSocket Object
const socket = new WebSocket(`ws://${window.location.host}`);

//- Handle message Object from WebSocket server
socket.addEventListener("message", (message) => {
  console.log(message.data);
});

//// Send message to WebSocket server
//// socket.addEventListener("open", () => {
////   socket.send("hello server");
//// });

//- Handle DOM event
const handleSubmit = (e) => {
  e.preventDefault();
  const input = messageForm.querySelector("input");
  socket.send(input.value);
  input.value = "";
};

//- DOM event
messageForm.addEventListener("submit", handleSubmit);
