"use client";

import { DeckOfCards } from "@/components/molecules/DeckOfCards";
import { Estimations } from "@/components/molecules/Estimations";
import { OnlinePlayers } from "@/components/molecules/OnlinePlayers";
import { useRoom } from "@/hooks/useRoom";
import { useEffect } from "react";

const Page = () => {
  const { join } = useRoom();

  useEffect(() => {
    const unsubscribe = join();

    return () => {
      unsubscribe();
    };
  }, [join]);

  return (
    <>
      <OnlinePlayers />
      <div className="flex-1">
        <Estimations />
      </div>
      <DeckOfCards />
    </>
  );
};

export default Page;
