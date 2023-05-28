import { Vote } from "@/interface/room";
import Image from "next/image";

export const CardUserEstimation = (props: Vote) => {
  const { displayName, photoURL, vote, createdAt } = props;

  return (
    <>
      <div className="chat chat-start">
        <div className="chat-image avatar">
          <div className="w-10 mask mask-squircle">
            <Image src={photoURL} alt={displayName} width={160} height={160} />
          </div>
        </div>
        <div className="chat-header">{displayName}</div>
        <div className="chat-bubble">{vote}</div>
        <div className="chat-footer opacity-50">
          at {new Date(createdAt).toLocaleTimeString()}
        </div>
      </div>
    </>
  );
};
