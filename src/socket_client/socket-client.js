'use strict';

const io = require("socket.io-client");
const socket = io("http://localhost:5000"); // Replace with your server's URL

// Conectarse al socket
socket.on("connect", () => {
  console.log("Connected to the Socket.io server");

  // Enviar un avatar al servidor cuando se establezca la conexión
  const avatar = { id: 1, name: "John", image: "avatar1.png" };
  socket.emit("client-send-avatar", avatar);
});

// Escuchar eventos del servidor
socket.on("avatars", (avatars) => {
  console.log("Avatars received from the server:", avatars);
});

socket.on("disconnect", () => {
  console.log("Disconnected from the Socket.io server");
});
