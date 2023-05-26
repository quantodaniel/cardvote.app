"use client";

import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";
import Link from "next/link";

export const Navbar = () => {
  const { currentUser } = useAuth();
  const currentAvatar = currentUser?.photoURL || "/no-avatar.png";

  return (
    <nav className="my-8 flex gap-4">
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
        <div>{currentUser?.displayName}</div>
        <div className="avatar online">
          <Image
            src={currentAvatar}
            className="rounded-full shadow-lg"
            width={36}
            height={36}
            alt="Logged User Avatar"
          />
        </div>
      </div>
    </nav>
  );
};
