import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.PROD
  ? "https://tamilnadu.onrender.com"
  : "http://localhost:5001";

export const socket = io(SOCKET_URL, {
  withCredentials: true,
});
