import { useRouter } from "next/router";
import { useState } from "react";

export default function Home() {
  const router = useRouter();

  const [manualRoomId, setManualRoomId] = useState<string>("");

  const handleJoinRoom = () => {
    router.push(`/room/${manualRoomId}`);
  };

  const handleCreateRoom = async () => {
    const room = await fetch("/api/room");
    const { roomId } = await room.json();
    router.push(`/room/${roomId}`);
  };

  return (
    <div className="m-5">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleCreateRoom}
      >
        Criar sala
      </button>

      <div className="m-5">
        <input
          type="text"
          placeholder="Digite o código da sala"
          className="border-2 border-gray-300 p-2 rounded-lg"
          value={manualRoomId}
          onChange={(e) => setManualRoomId(e.target.value)}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleJoinRoom}
        >
          Entrar
        </button>
      </div>
    </div>
  );
}
