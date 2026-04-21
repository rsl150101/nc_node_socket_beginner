# 🚀 Node.js WebSocket & WebRTC Beginner Project

이 프로젝트는 노마드 코더(Nomad Coders)의 **"Zoom 클론 코딩"** 강의를 기반으로 한 실습 및 챌린지 결과물들을 모아놓은 저장소입니다. 
기본적인 WebSocket부터 Socket.io, 그리고 P2P 통신인 WebRTC까지 단계별로 구현되어 있습니다.

---

## 🛠 Tech Stack

- **Backend**: Node.js, Express
- **Real-time**: WebSocket (ws), Socket.io, WebRTC
- **View Engine**: Pug
- **Dev Tools**: Babel, Nodemon

---

## 📂 프로젝트 구조

프로젝트는 학습 단계에 따라 여러 섹션과 챌린지로 나누어져 있습니다.

### 📍 Sections
- **`section1_websocket`**: 순수 WebSocket(`ws` 패키지)을 이용한 실시간 채팅 구현 기초.
- **`section2_socketio`**: Socket.io 프레임워크를 활용한 방(Room) 개념 도입 및 채팅 고도화.
- **`section3_webrtc`**: WebRTC를 활용한 1:1 P2P 화상 채팅 및 미디어 스트리밍 기초.

### 🏆 Challenges
- **`zoom_clone_challenge_websocket`**: WebSocket 기반 줌 클론 챌린지.
- **`zoom_clone_challenge_socketio`**: Socket.io 기반 줌 클론 챌린지.
- **`zoom_clone_challenge_webrtc`**: WebRTC 기반 P2P 화상 채팅 챌린지 (Data Channels 포함).

---

## 🚀 시작하기

각 폴더는 독립적인 Node.js 프로젝트입니다. 실행을 원하는 폴더로 이동하여 다음 명령어를 입력하세요.

1. **의존성 설치**
   ```bash
   npm install
   ```

2. **개발 서버 실행**
   ```bash
   npm run dev
   ```

3. **브라우저 접속**
   - 기본적으로 `http://localhost:5000` (또는 각 프로젝트 `server.js`에 정의된 포트)에서 확인 가능합니다.

---

## 📝 참고 사항

- 이 프로젝트는 학습용으로 제작되었으며, WebRTC의 경우 동일 네트워크(또는 STUN 서버를 통한 NAT 트래버설 가능 환경)에서 테스트하는 것이 권장됩니다.
