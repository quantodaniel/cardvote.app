export type User = {
  uid: string;
  photoURL: string;
  displayName: string;
};

export type Vote = User & {
  vote: number | string;
  createdAt: number;
};

export type Room = {
  id: string;
  reveal: boolean;
  online: Record<string, User>;
  votes: Record<string, Vote>;
};
