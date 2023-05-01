import type { Server as HTTPServer } from "http";
import type { NextApiResponse } from "next";
import type { Socket as NetSocket } from "net";
import type { Server as IOServer } from "socket.io";

export type User = {
  id: string;
  name: string;
  vote: string;
  lastActive: number;
};

export type ResponseData = {
  users: User[];
  reveal: boolean;
};

export interface SocketServer extends HTTPServer {
  io?: IOServer | undefined;
}

export interface SocketWithIO extends NetSocket {
  server: SocketServer;
}

export interface NextApiResponseWithSocket extends NextApiResponse {
  socket: SocketWithIO;
}

export interface ClientEvents {
  update: (data: ResponseData) => void;
}

export interface ServerEvents {
  vote: (card: string) => void;
  join: (roomId: string) => void;
  reset: () => void;
  reveal: () => void;
}
