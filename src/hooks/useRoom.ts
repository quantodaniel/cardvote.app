"use client";

import "@/config/firebase";
import { Room } from "@/interface/room";

import { serviceRoom } from "@/services/room";
import { useCallback, useState } from "react";

export const useRoom = (currentRoomId: string) => {
  const [roomData, setRoomData] = useState<Room | null>(null);

  const subscribe = useCallback(() => {
    serviceRoom.join(currentRoomId);
    const unsubscribe = serviceRoom.subscribe(currentRoomId, setRoomData);

    return () => {
      serviceRoom.leave(currentRoomId);
      unsubscribe();
    };
  }, [currentRoomId]);

  const join = useCallback(() => {
    const unsubscribe = subscribe();
    window.addEventListener("beforeunload", unsubscribe);

    return () => {
      unsubscribe();
      window.removeEventListener("beforeunload", unsubscribe);
    };
  }, [subscribe]);

  const vote = useCallback(
    (vote: string) => {
      serviceRoom.vote(currentRoomId, vote);
    },
    [currentRoomId]
  );

  const clearVotes = useCallback(() => {
    serviceRoom.clearVotes(currentRoomId);
  }, [currentRoomId]);

  return { join, vote, clearVotes, roomData };
};
