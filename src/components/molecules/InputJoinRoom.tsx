"use client";

import { useRouter } from "next/navigation";
import { useRef } from "react";

export const InputJoinRoom = () => {
  const router = useRouter();
  const inputRoomRef = useRef<HTMLInputElement>(null);

  const joinRoom = () => {
    router.push(`/room/${inputRoomRef.current?.value}`);
  };

  return (
    <div className="form-control">
      <div className="input-group">
        <input
          ref={inputRoomRef}
          type="text"
          className="input input-bordered w-full"
          placeholder="Room Number"
        />
        <button className="btn btn-primary" onClick={joinRoom}>
          join room
        </button>
      </div>
    </div>
  );
};
