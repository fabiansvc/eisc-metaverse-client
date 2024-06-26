import Peer from "simple-peer";
import io from "socket.io-client";

// URLs and credentials for WebRTC and ICE servers
const serverWebRTCUrl = process.env.REACT_APP_DEPLOY_SERVER_WEB_RTC_URL;
const iceServerUrl = process.env.REACT_APP_ICE_SERVER_URL;
const iceServerUsername = process.env.REACT_APP_ICE_SERVER_USERNAME;
const iceServerCredential = process.env.REACT_APP_ICE_SERVER_CREDENTIAL;

let socket = null;
let peers = {};
let localMediaStream = null;

/**
 * Initializes the WebRTC connection if supported.
 * @async
 * @function init
 */
const init = async () => {
  if (Peer.WEBRTC_SUPPORT) {
    localMediaStream = await getMedia();
    initSocketConnection();
  } else {
    return;
  }
};

/**
 * Gets the user's media stream (audio only).
 * @async
 * @function getMedia
 * @returns {Promise<MediaStream>} The user's media stream.
 */
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

/**
 * Initializes the socket connection and sets up event listeners.
 * @function initSocketConnection
 */
function initSocketConnection() {
  socket = io(serverWebRTCUrl);

  socket.on("introduction", (otherClientIds) => {
    for (let i = 0; i < otherClientIds.length; i++) {
      if (otherClientIds[i] != socket.id) {
        let theirId = otherClientIds[i];
        peers[theirId] = {};

        let pc = createPeerConnection(theirId, true);
        peers[theirId].peerConnection = pc;

        createClientMediaElements(theirId);
      }
    }
  });

  socket.on("newUserConnected", (theirId) => {
    if (theirId != socket.id && !(theirId in peers)) {
      peers[theirId] = {};
      createClientMediaElements(theirId);
    }
  });

  socket.on("userDisconnected", (_id) => {
    if (_id != socket.id) {
      removeClientAudioElementAndCanvas(_id);
      delete peers[_id];
    }
  });

  socket.on("signal", (to, from, data) => {
    if (to != socket.id) {
      return;
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

/**
 * Creates a new peer connection.
 * @function createPeerConnection
 * @param {string} theirSocketId - The socket ID of the peer.
 * @param {boolean} [isInitiator=false] - Whether the current client is the initiator.
 * @returns {Peer} The created peer connection.
 */
function createPeerConnection(theirSocketId, isInitiator = false) {
  let peerConnection = new Peer({
    initiator: isInitiator,
    config: {
      iceServers: [
        {
          urls: iceServerUrl,
          username: iceServerUsername,
          credential: iceServerCredential
        }
      ]
    }
  });

  peerConnection.on("signal", (data) => {
    socket.emit("signal", theirSocketId, socket.id, data);
  });

  peerConnection.on("connect", () => {
    peerConnection.addStream(localMediaStream);
  });

  peerConnection.on("stream", (stream) => {
    updateClientMediaElements(theirSocketId, stream);
  });

  return peerConnection;
}

/**
 * Disables the outgoing media stream.
 * @function disableOutgoingStream
 */
function disableOutgoingStream() {
  localMediaStream.getTracks().forEach((track) => {
    track.enabled = false;
  });
}

/**
 * Enables the outgoing media stream.
 * @function enableOutgoingStream
 */
function enableOutgoingStream() {
  localMediaStream.getTracks().forEach((track) => {
    track.enabled = true;
  });
}

/**
 * Creates media elements for a client.
 * @function createClientMediaElements
 * @param {string} _id - The ID of the client.
 */
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

/**
 * Updates media elements for a client with a new stream.
 * @function updateClientMediaElements
 * @param {string} _id - The ID of the client.
 * @param {MediaStream} stream - The new media stream.
 */
function updateClientMediaElements(_id, stream) {
  let audioStream = new MediaStream([stream.getAudioTracks()[0]]);
  let audioEl = document.getElementById(_id + "_audio");
  audioEl.srcObject = audioStream;
}

/**
 * Removes media elements for a client.
 * @function removeClientAudioElementAndCanvas
 * @param {string} _id - The ID of the client.
 */
function removeClientAudioElementAndCanvas(_id) {
  let audioEl = document.getElementById(_id + "_audio");
  if (audioEl != null) {
    audioEl.remove();
  }
}

export { init, disableOutgoingStream, enableOutgoingStream };
