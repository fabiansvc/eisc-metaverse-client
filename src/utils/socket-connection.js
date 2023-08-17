'use strict';

const io = require("socket.io-client");

function setupSocket(avatar) {
  const socket = io("http://localhost:5000");

  // Connect to the socket
  socket.on("connect", () => {
    console.log("Connected to the Socket.io server");

    // Send an avatar to the server when the connection is established
    socket.emit("client-send-avatar", avatar);
  });

  // Listen for server events
  socket.on("avatars", (avatars) => {
    console.log("Avatars received from the server:", avatars);
  });

  socket.on("disconnect", () => {
    console.log("Disconnected from the Socket.io server");
  });
}

module.exports = setupSocket;