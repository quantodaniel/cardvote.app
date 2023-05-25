"use client";

import { useAuth } from "@/hooks/useAuth";

export const Providers = ({ children }: any) => {
  useAuth();

  return <>{children}</>;
};

export default Providers;
