import { ClientEvents, ResponseData, ServerEvents, User } from "@/types";
import { useRouter } from "next/router";
import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Socket, io } from "socket.io-client";

type SocketClient = Socket<ClientEvents, ServerEvents> | null;

type CardProps = {
  reveal: boolean;
  vote: string;
};

const Card = (props: CardProps) => {
  const { reveal, vote } = props;

  let className = "bg-slate-200 border border-slate-300 shadow-inner";
  if (vote) className = "bg-green-200 border border-green-400 shadow";

  return (
    <div
      className={`transition-all w-20 h-28 rounded p-2 flex items-center justify-center ${className}`}
    >
      <span className="text-2xl font-bold">{reveal ? vote : "?"}</span>
    </div>
  );
};

const Votes = (props: ResponseData) => {
  const { users, reveal } = props;

  return (
    <div className="flex gap-2">
      {users.map((user) => {
        return <Card key={user.id} reveal={reveal} vote={user.vote} />;
      })}
    </div>
  );
};

export default function Home() {
  const router = useRouter();
  const roomId = router.query.id as string;
  const socket = useRef<SocketClient>(null);
  const [data, setData] = useState<ResponseData>();

  const handleInit = useCallback(async () => {
    await fetch("/api/socket");
    if (!roomId || socket.current) return;

    socket.current = io();
    socket.current?.emit("join", roomId);
    socket.current?.on("update", setData);
  }, [roomId]);

  const emit = (event: keyof ServerEvents, data?: any) => {
    if (socket.current) {
      socket.current.emit(event, data);
      return;
    }

    console.log("redirect");
  };

  const handleVote = (card: string) => emit("vote", card);
  const handleReset = () => emit("reset");
  const handleReveal = () => emit("reveal");

  const handleDisconnect = useCallback(() => {
    if (socket.current) {
      socket.current.disconnect();
      socket.current = null;
      router.push("/");
    }
  }, [router]);

  useEffect(() => {
    handleInit();

    return () => {
      // handleDisconnect();
    };
  }, [handleDisconnect, handleInit]);

  if (!data) return <div>Loading...</div>;

  return (
    <div className="flex flex-col gap-20 py-20">
      <h1 className="text-xl font-bold text-center">Room: {roomId}</h1>

      <div className="mx-auto">
        <Votes {...data} />
      </div>

      <div className="mx-auto">
        <button
          type="button"
          onClick={() => handleReset()}
          className="py-2 px-4 bg-slate-300"
        >
          RESET
        </button>
        <button
          type="button"
          onClick={() => handleReveal()}
          className="py-2 px-4 bg-slate-300"
        >
          REVEAL CARDS
        </button>
      </div>

      <div className="mx-auto">
        <button
          type="button"
          onClick={() => handleVote("A")}
          className="py-2 px-4 bg-slate-300"
        >
          A
        </button>
        <button
          type="button"
          onClick={() => handleVote("B")}
          className="py-2 px-4 bg-slate-300"
        >
          B
        </button>
        <button
          type="button"
          onClick={() => handleVote("C")}
          className="py-2 px-4 bg-slate-300"
        >
          C
        </button>
      </div>
    </div>
  );
}
