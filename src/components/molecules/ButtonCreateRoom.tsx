"use client";

import { serviceRoom } from "@/services/room";
import { useRouter } from "next/navigation";

export const ButtonCreateRoom = () => {
  const router = useRouter();

  const createRoom = () => {
    const roomId = serviceRoom.getNewId();
    serviceRoom.create(roomId);
    router.push(`/room/${roomId}`);
  };

  return (
    <button className="btn btn-primary w-full" onClick={createRoom}>
      create room
    </button>
  );
};
