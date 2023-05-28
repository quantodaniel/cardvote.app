import { User } from "@/interface/room";
import Image from "next/image";

export const CardUserOnline = (props: User) => {
  const { displayName, photoURL } = props;

  return (
    <div className="avatar">
      <div className="w-16">
        <Image src={photoURL} alt={displayName} width={64} height={64} />
      </div>
    </div>
  );
};
