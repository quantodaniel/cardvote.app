"use client";

import { Cards } from "@/components/molecules/Cards";
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
      <Estimations />
      <Cards />
    </>
  );
};

export default Page;
