import type { NextApiRequest } from "next";
import { Server } from "socket.io";

import type {
  ServerEvents,
  NextApiResponseWithSocket,
  ClientEvents,
  User,
} from "@/types";

const HOUR_IN_MS = 60 * 60 * 1000;

const socketRoom = new Map<string, string>();
const roomUsers = new Map<string, User[]>();

const getUsers = (roomId: string) => {
  return roomUsers.get(roomId) || [];
};

const removeInactiveUsers = () => {
  roomUsers.forEach((users, roomId) => {
    const activeUsers = users.filter(
      (user) => Date.now() - user.lastActive < HOUR_IN_MS
    );

    if (activeUsers.length === 0) roomUsers.delete(roomId);
    else roomUsers.set(roomId, activeUsers);
  });
};

const handler = (req: NextApiRequest, res: NextApiResponseWithSocket) => {
  if (res.socket.server.io) return res.end();

  const io = new Server<ServerEvents, ClientEvents>(res.socket.server);

  const updateUsers = (roomId: string, users: User[], reveal = false) => {
    users.forEach((user) => (user.lastActive = Date.now()));
    roomUsers.set(roomId, users);

    io.to(roomId).emit("update", { users, reveal });
    removeInactiveUsers();
  };

  io.on("connection", (socket) => {
    socket.on("join", (roomId) => {
      socket.join(roomId);
      socketRoom.set(socket.id, roomId);

      const users = roomUsers.get(roomId) || [];
      users.push({ id: socket.id, name: "", vote: "", lastActive: Date.now() });
      updateUsers(roomId, users);
    });

    socket.on("vote", (card: string) => {
      const roomId = socketRoom.get(socket.id);
      if (!roomId) return;

      const users = getUsers(roomId);
      const user = users.find((user) => user.id === socket.id);
      if (!user) return;

      if (user.vote === card) user.vote = "";
      else user.vote = card;

      updateUsers(roomId, users);
    });

    socket.on("reveal", () => {
      const roomId = socketRoom.get(socket.id);
      if (!roomId) return;

      const users = getUsers(roomId);
      updateUsers(roomId, users, true);
    });

    socket.on("reset", () => {
      const roomId = socketRoom.get(socket.id);
      if (!roomId) return;

      const users = getUsers(roomId);
      users.forEach((user) => (user.vote = ""));
      updateUsers(roomId, users);
    });

    socket.on("disconnect", () => {
      const roomId = socketRoom.get(socket.id);
      if (!roomId) return;

      const users = getUsers(roomId);
      const remainingUsers = users.filter((user) => user.id !== socket.id);
      updateUsers(roomId, remainingUsers);

      socketRoom.delete(socket.id);
      socket.leave(roomId);
    });

    socket.on("error", (error) => {
      console.error(error);
    });
  });

  res.socket.server.io = io;
  return res.end();
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
