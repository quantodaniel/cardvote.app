import { create } from "zustand";

type UserStore = {
  displayName: string;
  photoURL: string;
  setDisplayName: (displayName: string) => void;
  setPhotoURL: (photoURL: string) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  displayName: "",
  photoURL: "",
  setDisplayName: (displayName) => set({ displayName }),
  setPhotoURL: (photoURL) => set({ photoURL }),
}));

export default useUserStore;
