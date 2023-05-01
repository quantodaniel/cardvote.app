import { ClientEvents, ResponseData, ServerEvents } from "@/types";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import { Socket, io } from "socket.io-client";

type SocketClient = Socket<ClientEvents, ServerEvents> | null;

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

  const handleVote = (card: string) => {
    emit("vote", card);
  };

  const handleReset = () => {
    emit("reset");
  };

  const handleReveal = () => {
    emit("reveal");
  };

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
      handleDisconnect();
    };
  }, [handleDisconnect, handleInit]);

  return (
    <div>
      <h1>{roomId}</h1>
      <div className="flex gap-2 m-5">
        <button
          type="button"
          onClick={handleDisconnect}
          className="py-2 px-4 bg-slate-300 disabled:bg-slate-100"
        >
          desconectar
        </button>
      </div>

      <div className="flex gap-2 m-5">
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

      <div>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  );
}
