import { useRoom } from "@/hooks/useRoom";

export const Cards = () => {
  const { vote, reveal, clearVotes } = useRoom();

  return (
    <div className="mb-4">
      <h3 className="text-xl">Pick your card</h3>
      <div className="flex gap-2 sticky bottom-0">
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
        <button className="btn btn-primary" onClick={reveal}>
          Reveal
        </button>
      </div>
    </div>
  );
};
