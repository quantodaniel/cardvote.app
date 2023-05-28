"use client";

import { useRoom } from "@/hooks/useRoom";
import { useParams } from "next/navigation";
import { useEffect } from "react";

const Page = () => {
  const params = useParams();
  const currentRoomId = params.roomId;

  const { join, vote, roomData, clearVotes } = useRoom(currentRoomId);

  const usersToArray = Object.values(roomData?.online ?? {});
  const votesToArray = Object.values(roomData?.votes ?? {});

  useEffect(() => {
    const unsubscribe = join();

    return () => {
      unsubscribe();
    };
  }, [join]);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex gap-2">
        <button className="btn" onClick={() => vote("1")}>
          Vote 1
        </button>
        <button className="btn" onClick={() => vote("2")}>
          Vote 2
        </button>
        <button className="btn" onClick={() => vote("3")}>
          Vote 3
        </button>
        <button className="btn" onClick={clearVotes}>
          Clear
        </button>
      </div>

      <div>
        <h1>Online users</h1>

        <div className="flex gap-2">
          {usersToArray.map((user) => (
            <div
              className="card shadow-lg bg-base-200"
              key={`card-online-${user.name}`}
            >
              <div className="card-body">
                <h2 className="card-title">{user.name}</h2>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h1>Votes</h1>

        <div className="flex gap-2">
          {votesToArray.map((vote) => (
            <div
              className="card shadow-lg bg-base-200"
              key={`card-vote-${vote.name}`}
            >
              <div className="card-body">
                <h2 className="card-title">{vote.vote}</h2>
                <p>{vote.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
