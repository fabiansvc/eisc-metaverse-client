import socketIOClient from "socket.io-client";

/**
 * Socket connection
 */
export const socketServer = socketIOClient(
  process.env.REACT_APP_SERVER_LOCALHOST_SERVER_URL
);
