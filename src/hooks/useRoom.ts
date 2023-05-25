"use client";

import { useRouter, useParams } from "next/navigation";

export const useRoom = () => {
  const router = useRouter();
  const params = useParams();

  const currentRoomId = params.roomId;

  const createRoomId = () => {
    return Math.random().toString(36).substring(7);
  };

  const createRoom = () => {
    const roomId = createRoomId();
    router.push(`/room/${roomId}`);
  };

  return { currentRoomId, createRoomId, createRoom };
};
