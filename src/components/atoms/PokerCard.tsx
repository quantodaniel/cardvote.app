import { cardSizes } from "@/config/cardSizes";
import Image from "next/image";

type Props = {
  cardSize: number | string;
};

export const PokerCard = (props: Props) => {
  const { cardSize } = props;
  let { top, bottom } = { top: "?", bottom: "?" };

  if (typeof cardSize === "number") {
    top = cardSizes[cardSize].top;
    bottom = cardSizes[cardSize].bottom;
  }

  return (
    <div className="flex flex-col bg-base-200 rounded-lg w-20 h-28 justify-between px-2 py-1 border-4 border-accent text-accent">
      <div className="text-lg font-mono text-start">{top}</div>
      <Image
        src="/dall-e-poker.png"
        className="rounded-full m-auto border-2 border-accent"
        width={32}
        height={32}
        alt="Planing Poker"
      />
      <div className="text-lg font-mono text-end">{bottom}</div>
    </div>
  );
};
