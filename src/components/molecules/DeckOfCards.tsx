import { useRoom } from "@/hooks/useRoom";
import { PokerCard } from "../atoms/PokerCard";
import { cardSizes } from "@/config/cardSizes";

export const DeckOfCards = () => {
  const { vote, reveal, clearVotes } = useRoom();

  return (
    <div>
      <h3 className="text-xl">Pick your card</h3>
      <div className="flex gap-2">
        {cardSizes.map((cardSize, index) => {
          return (
            <button
              key={`card-${cardSize.top}`}
              onClick={() => vote(index)}
              className="shadow-lg hover:shadow-xl transition-all"
            >
              <PokerCard cardSize={index} />
            </button>
          );
        })}

        <div className="grid">
          <button className="btn" onClick={clearVotes}>
            Clear
          </button>
          <button className="btn" onClick={reveal}>
            Reveal
          </button>
        </div>
      </div>
    </div>
  );
};
