"use client";

import useUserStore from "@/store/user";
import Image from "next/image";
import Link from "next/link";

export const Navbar = () => {
  const photoURL = useUserStore((state) => state.photoURL);
  const displayName = useUserStore((state) => state.displayName);

  return (
    <nav className="flex gap-4">
      <Link href="/" className="btn btn-ghost h-auto hover:bg-transparent p-0">
        <Image
          src="/dall-e-poker.png"
          className="rounded-lg shadow-lg"
          width={76}
          height={76}
          alt="Planing Poker"
        />
      </Link>

      <div>
        <h1 className="text-4xl">cardvote.app</h1>
        <h2 className="text-xl">Planning to the Next Level!</h2>
      </div>

      <div className="flex flex-1 justify-end items-center gap-2">
        <div>{displayName}</div>
        <div className="avatar online">
          <Image
            src={photoURL || "/no-avatar.png"}
            className="rounded-full shadow-lg"
            width={36}
            height={36}
            alt={displayName}
          />
        </div>
      </div>
    </nav>
  );
};
