const socket = io();

const myFace = document.getElementById("myFace");
const muteBtn = document.getElementById("mute");
const cameraBtn = document.getElementById("camera");
const camerasSelect = document.getElementById("cameras");
const welcome = document.getElementById("welcome");
const call = document.getElementById("call");

call.hidden = true;

let myStream;
let muted = false;
let cameraOff = false;
/** @type {RTCPeerConnection}*/
let myPeerConnection;
let myDatachannel;

const getCameras = async () => {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const cameras = devices.filter((device) => device.kind === "videoinput");
    const curCamera = myStream.getVideoTracks()[0];
    cameras.forEach((camera) => {
      const option = document.createElement("option");
      option.value = camera.deviceId;
      option.innerText = camera.label;
      if (curCamera.label === camera.label) {
        option.selected = true;
      }
      camerasSelect.appendChild(option);
    });
  } catch (error) {
    console.log(error);
  }
};

const getMedia = async (deviceId) => {
  try {
    const initialConstraints = {
      audio: true,
      video: { facingMode: "user" },
    };
    const cameraConstraints = {
      audio: true,
      video: { deviceId: { exact: deviceId } },
    };
    myStream = await navigator.mediaDevices.getUserMedia(
      deviceId ? cameraConstraints : initialConstraints
    );
    myStream.getAudioTracks().forEach((track) => (track.enabled = !muted));
    myStream.getVideoTracks().forEach((track) => (track.enabled = !cameraOff));
    myFace.srcObject = myStream;
    if (!deviceId) {
      await getCameras();
    }
  } catch (e) {
    console.log(e);
  }
};

const handleMuteBtnCLick = () => {
  myStream
    .getAudioTracks()
    .forEach((track) => (track.enabled = !track.enabled));
  if (!muted) {
    muteBtn.innerText = "Unmute";
    muted = true;
  } else {
    muteBtn.innerText = "Mute";
    muted = false;
  }
};

const handleCameraBtnCLick = () => {
  myStream
    .getVideoTracks()
    .forEach((track) => (track.enabled = !track.enabled));
  if (cameraOff) {
    cameraBtn.innerText = "Turn Camera Off";
    cameraOff = false;
  } else {
    cameraBtn.innerText = "Turn Camera On";
    cameraOff = true;
  }
};

const handleCamerChange = async () => {
  await getMedia(camerasSelect.value);
  if (myPeerConnection) {
    const videoTrack = myStream.getVideoTracks()[0];
    const videoSender = myPeerConnection
      .getSenders()
      .find((sender) => sender.track.kind === "video");
    videoSender.replaceTrack(videoTrack);
  }
};

muteBtn.addEventListener("click", handleMuteBtnCLick);
cameraBtn.addEventListener("click", handleCameraBtnCLick);
camerasSelect.addEventListener("change", handleCamerChange);

//- welcome form
const welcomeForm = welcome.querySelector("form");

let roomName;

const initCall = async () => {
  welcome.hidden = true;
  call.hidden = false;
  await getMedia();
  makeConnection();
};

const handleWelcomeFormSubmit = async (e) => {
  e.preventDefault();
  const roomNameInput = welcomeForm.querySelector("input");
  roomName = roomNameInput.value;
  await initCall();
  socket.emit("joinRoom", roomName);
};

welcomeForm.addEventListener("submit", handleWelcomeFormSubmit);

//- socket
//* offer side
socket.on("welcome", async () => {
  myDatachannel = myPeerConnection.createDataChannel("chat");
  myDatachannel.addEventListener("message", (event) => console.log(event.data));
  const offer = await myPeerConnection.createOffer();
  myPeerConnection.setLocalDescription(offer);
  socket.emit("offer", offer, roomName);
  myPeerConnection.addEventListener("icecandidate", handleOfferIce);
});

//* answer side
socket.on("offer", async (offer) => {
  myPeerConnection.addEventListener("datachannel", (event) => {
    myDatachannel = event.channel;
    myDatachannel.addEventListener("message", (event) => {
      console.log(event.data);
    });
  });
  myPeerConnection.setRemoteDescription(offer);
  const answer = await myPeerConnection.createAnswer();
  myPeerConnection.setLocalDescription(answer);
  socket.emit("answer", answer, roomName);
  myPeerConnection.addEventListener("icecandidate", handleAnswerIce);
});

//* offer side
socket.on("answer", (answer) => {
  myPeerConnection.setRemoteDescription(answer);
});

//* answer side
socket.on("offerIce", (ice) => {
  myPeerConnection.addIceCandidate(ice); //* Add offer ICE
});

//* offer side
socket.on("answerIce", (ice) => {
  myPeerConnection.addIceCandidate(ice); //* Add answer ICE
});

//- RTC Code
const makeConnection = () => {
  myPeerConnection = new RTCPeerConnection();
  myStream
    .getTracks()
    .forEach((track) => myPeerConnection.addTrack(track, myStream));

  myPeerConnection.addEventListener("track", handlePeerTrack);
};

const handleOfferIce = (event) => {
  socket.emit("offerIce", event.candidate, roomName);
};

const handleAnswerIce = (event) => {
  socket.emit("answerIce", event.candidate, roomName);
};

const handlePeerTrack = (event) => {
  const peerFace = document.querySelector("#peerFace");
  peerFace.srcObject = event.streams[0];
};
