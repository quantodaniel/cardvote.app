"use client";

import { useUserStore } from "@/store/user";

type Props = {
  children: React.ReactNode;
};

export const Loader = (props: Props) => {
  const { children } = props;

  const displayName = useUserStore((state) => state.displayName);
  const photoURL = useUserStore((state) => state.photoURL);

  const isUserLoading = !displayName || !photoURL;
  const loadingMessage = !displayName
    ? "Creating random user..."
    : "Generating random photo...";

  if (isUserLoading) {
    return (
      <div className="flex flex-col gap-6 items-center justify-center h-screen">
        <div
          className="inline-block h-20 w-20 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        >
          <span className="absolute -m-px h-px w-px overflow-hidden whitespace-nowrap border-0 p-0 [clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
        <h1 className="text-xl">{loadingMessage}</h1>
      </div>
    );
  }

  return <>{children}</>;
};
