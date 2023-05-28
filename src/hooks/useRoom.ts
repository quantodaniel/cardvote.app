"use client";

import "@/config/firebase";

import { serviceRoom } from "@/services/room";
import { useRoomStore } from "@/store/room";
import { useParams } from "next/navigation";
import { useCallback } from "react";

export const useRoom = () => {
  const params = useParams();
  const currentRoomId = params.roomId;

  const setRoomData = useRoomStore((state) => state.setRoomData);

  const subscribe = useCallback(() => {
    serviceRoom.join(currentRoomId);
    const unsubscribe = serviceRoom.subscribe(currentRoomId, setRoomData);

    return () => {
      serviceRoom.leave(currentRoomId);
      unsubscribe();
    };
  }, [currentRoomId, setRoomData]);

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

  const reveal = useCallback(() => {
    serviceRoom.reveal(currentRoomId);
  }, [currentRoomId]);

  const clearVotes = useCallback(() => {
    serviceRoom.clearVotes(currentRoomId);
  }, [currentRoomId]);

  return { join, vote, reveal, clearVotes };
};
