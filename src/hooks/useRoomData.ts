import { useRoomStore } from "@/store/room";
import { useMemo } from "react";

export const useRoomData = () => {
  const online = useRoomStore((state) => state.online);
  const votes = useRoomStore((state) => state.votes);
  const reveal = useRoomStore((state) => state.reveal);

  const sortedEstimations = useMemo(() => {
    const currentVotes = Object.values(votes ?? {});
    return currentVotes.sort((a, b) => {
      if (a.createdAt > b.createdAt) return 1;
      if (a.createdAt < b.createdAt) return -1;
      return 0;
    });
  }, [votes]);

  const estimations = useMemo(() => {
    if (reveal) return sortedEstimations;
    return sortedEstimations.map((vote) => ({ ...vote, vote: "?" }));
  }, [sortedEstimations, reveal]);

  const onlineUsers = useMemo(() => {
    return Object.values(online ?? {});
  }, [online]);

  return { estimations, onlineUsers };
};
