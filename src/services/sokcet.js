import { io } from "socket.io-client";

const URL = "https://sw1node-production.up.railway.app/"; // cambia si usas otra URL de backend

export const socket = io(URL, {
  autoConnect: false, // nos conectamos manualmente
});
