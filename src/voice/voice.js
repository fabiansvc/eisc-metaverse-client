import Peer from "simple-peer";
import io from "socket.io-client";

let mySocket = null
let peers = {};
let localMediaStream = null;

const init = async () => {
  localMediaStream = await getMedia();
  initSocketConnection();
};

async function getMedia() {
  let stream = null;
  try {
    stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  } catch (err) {
    console.log("Failed to get user media!");
    console.warn(err);
  }
  return stream;
}

function initSocketConnection() {
  mySocket = io("https://eisc-metaverse-web-rtc.onrender.com");
  // mySocket = io("http://localhost:5000"); 
  
  mySocket.on("introduction", (otherClientIds) => {

    for (let i = 0; i < otherClientIds.length; i++) {
      if (otherClientIds[i] != mySocket.id) {
        let theirId = otherClientIds[i];
        // console.log("Adding client with id " + theirId);
        peers[theirId] = {};

        let pc = createPeerConnection(theirId, true);
        peers[theirId].peerConnection = pc;

        createClientMediaElements(theirId);
      }
    }
  });

  mySocket.on("newUserConnected", (theirId) => {
    if (theirId != mySocket.id && !(theirId in peers)) {
      peers[theirId] = {};
      createClientMediaElements(theirId);
    }
  });

  mySocket.on("userDisconnected", (clientCount, _id, _ids) => {
    if (_id != mySocket.id) {
      removeClientAudioElementAndCanvas(_id);
      delete peers[_id];
    }
  });

  mySocket.on("signal", (to, from, data) => {
    if (to != mySocket.id) {
      return
    }
    let peer = peers[from];
    if (peer && peer.peerConnection) {
      peer.peerConnection.signal(data);
    } else {
      let peerConnection = createPeerConnection(from, false);
      peers[from].peerConnection = peerConnection;
      peerConnection.signal(data);
    }
  });
}

function createPeerConnection(theirSocketId, isInitiator = false) {
  let peerConnection = new Peer({ initiator: isInitiator })
  peerConnection.on("signal", (data) => {
    mySocket.emit("signal", theirSocketId, mySocket.id, data);
  });

  peerConnection.on("connect", () => {
    peerConnection.addStream(localMediaStream);
  });

  peerConnection.on("stream", (stream) => {
    updateClientMediaElements(theirSocketId, stream);
  });

  peerConnection.on("close", () => {
  });

  peerConnection.on("error", (err) => {
  });

  return peerConnection;
}

function disableOutgoingStream() {
  localMediaStream.getTracks().forEach((track) => {
    track.enabled = false;
  });
}
// enable the outgoing stream
function enableOutgoingStream() {
  localMediaStream.getTracks().forEach((track) => {
    track.enabled = true;
  });
}

function createClientMediaElements(_id) {
  let audioEl = document.createElement("audio");
  audioEl.setAttribute("id", _id + "_audio");
  audioEl.controls = false;
  audioEl.volume = 1;
  document.body.appendChild(audioEl);

  audioEl.addEventListener("loadeddata", () => {
    audioEl.play();
  });
}

function updateClientMediaElements(_id, stream) {
  let audioStream = new MediaStream([stream.getAudioTracks()[0]]);
  let audioEl = document.getElementById(_id + "_audio");
  audioEl.srcObject = audioStream;
}

function removeClientAudioElementAndCanvas(_id) {
  let audioEl = document.getElementById(_id + "_audio");
  if (audioEl != null) {
    audioEl.remove();
  }
}

export {init, disableOutgoingStream, enableOutgoingStream}
