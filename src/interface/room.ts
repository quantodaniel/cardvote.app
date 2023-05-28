export type User = {
  avatar: string;
  name: string;
};

export type Vote = User & {
  vote: string;
};

export type Room = {
  val(): any;
  id: string;
  online: Record<string, User>;
  votes: Record<string, Vote>;
};
