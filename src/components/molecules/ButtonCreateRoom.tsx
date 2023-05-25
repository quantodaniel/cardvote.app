"use client";

import { useRoom } from "@/hooks/useRoom";

export const ButtonCreateRoom = () => {
  const { createRoom } = useRoom();

  return (
    <button className="btn btn-primary w-full" onClick={createRoom}>
      create room
    </button>
  );
};
