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

const OPTIONS = ["S", "M", "L", "XL", "XXL", "?"];

type SocketClient = Socket<ClientEvents, ServerEvents> | null;

type CardProps = {
  reveal: boolean;
  vote: string;
};

const Card = (props: CardProps) => {
  const { reveal, vote } = props;

  let className = "bg-slate-200 border border-slate-300 shadow-inner";
  if (vote) className = "bg-blue-200 border border-blue-400 shadow";

  return (
    <div
      className={`transition-all w-20 h-28 px-2 py-1 rounded flex flex-col justify-between ${className}`}
    >
      <span className="text-xl font-bold text-start">
        {reveal ? vote : "?"}
      </span>
      <span className="text-xl font-bold text-end">{reveal ? vote : "?"}</span>
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
    <div className="flex flex-col py-10">
      <div className="mx-auto flex flex-col gap-20">
        <h1 className="text-xl font-bold text-center">Room: {roomId}</h1>

        <div>
          <Votes {...data} />
        </div>

        <div className="flex gap-2 justify-center">
          <button
            type="button"
            onClick={() => handleReset()}
            className="bg-blue-400 py-2 px-4 hover:bg-blue-500 transition-all text-white rounded"
          >
            RESET
          </button>
          <button
            type="button"
            onClick={() => handleReveal()}
            className="bg-blue-700 py-2 px-4 hover:bg-blue-500 transition-all text-white rounded"
          >
            REVEAL CARDS
          </button>
        </div>
      </div>

      <div
        className="fixed flex w-screen h-32"
        style={{
          bottom: 0,
          left: "calc(50% - 40px)",
        }}
      >
        {OPTIONS.map((option, ix) => {
          const distanceFromCenter = ix + 0.5 - OPTIONS.length / 2;
          const cardAngle = distanceFromCenter * 2;
          const cardDistance = distanceFromCenter * 70;

          return (
            <button
              type="button"
              key={`btn_option_${ix}`}
              onClick={() => handleVote(option)}
              style={{
                position: "absolute",
                transform: `rotate(${cardAngle}deg) translateX(${cardDistance}%) `,
              }}
            >
              <div className="hover:-translate-y-3 transition-all">
                <Card reveal vote={option} />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
