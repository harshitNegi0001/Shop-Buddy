import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_BACKEND_PORT;

export const socket = io(SOCKET_URL, {
  autoConnect: false,
});

