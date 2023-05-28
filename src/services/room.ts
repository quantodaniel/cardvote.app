import { db, getCurrentUser, onValue, ref, set, get } from "@/config/firebase";
import { Room } from "@/interface/room";

export const serviceRoom = {
  getNewId: () => {
    return Math.random().toString(36).substring(7);
  },

  create: async (roomId: string) => {
    set(ref(db, `rooms/${roomId}`), {
      id: roomId,
      createdAt: Date.now(),
    });
  },

  join: (roomId: string) => {
    const currentUser = getCurrentUser();
    if (!currentUser) return;

    set(ref(db, `rooms/${roomId}/online/${currentUser.uid}`), {
      name: currentUser.displayName,
      avatar: currentUser.photoURL,
    });
  },

  leave: (roomId: string) => {
    const currentUser = getCurrentUser();
    if (!currentUser) return;

    set(ref(db, `rooms/${roomId}/online/${currentUser.uid}`), null);
    set(ref(db, `rooms/${roomId}/votes/${currentUser.uid}`), null);
  },

  vote: (roomId: string, vote: string) => {
    const currentUser = getCurrentUser();
    if (!currentUser) return;

    set(ref(db, `rooms/${roomId}/votes/${currentUser.uid}`), {
      vote,
      name: currentUser.displayName,
      avatar: currentUser.photoURL,
    });
  },

  clearVotes: (roomId: string) => {
    set(ref(db, `rooms/${roomId}/votes`), null);
  },

  subscribe: (roomId: string, callback: (data: Room) => void) => {
    const roomRef = ref(db, `rooms/${roomId}`);
    return onValue(roomRef, (snapshot) => callback(snapshot.val()));
  },

  get: async (roomId: string) => {
    const roomRef = ref(db, `rooms/${roomId}`);
    const snapshot = await get(roomRef);
    return snapshot.val();
  },

  exists: async (roomId: string) => {
    const roomRef = ref(db, `rooms/${roomId}`);
    const snapshot = await get(roomRef);
    return snapshot.exists();
  },
};
