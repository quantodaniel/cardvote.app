import { Room } from "@/interface/room";
import { create } from "zustand";

type RoomStore = Room & {
  setRoomData: (roomData: Room) => void;
};

export const useRoomStore = create<RoomStore>((set) => ({
  id: "",
  reveal: false,
  online: {},
  votes: {},
  setRoomData: (roomData) => {
    set({
      ...roomData,
      online: roomData.online ?? {},
      votes: roomData.votes ?? {},
    });
  },
}));
