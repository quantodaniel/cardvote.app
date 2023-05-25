import Image from "next/image";
import Link from "next/link";

export const Navbar = () => {
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
    </nav>
  );
};
