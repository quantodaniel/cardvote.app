import { Vote } from "@/interface/room";
import Image from "next/image";
import { PokerCard } from "./PokerCard";

export const CardUserEstimation = (props: Vote) => {
  const { displayName, photoURL, vote, createdAt } = props;

  return (
    <div className="card card-compact bg-base-100 shadow-lg card-side card-bordered">
      <figure>
        <Image
          src={photoURL}
          alt={displayName}
          width={160}
          height={160}
          className="h-full w-40"
        />
      </figure>
      <div className="card-body">
        <div className="mx-auto">
          <PokerCard cardSize={vote} />
        </div>
      </div>
      <div className="absolute bottom-2 left-2 badge badge-primary line-clamp-1">
        {displayName}
      </div>
    </div>
  );
};
