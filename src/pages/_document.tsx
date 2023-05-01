import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="bg-slate-50">
        <nav className="bg-white p-5 shadow-sm">
          <div className="container max-w-screen-lg mx-auto">
            <h1 className="text-2xl font-bold">Planning Poker</h1>
            <h2 className="text-lg font-medium">cardvote.app</h2>
          </div>
        </nav>
        <main className="p-5">
          <div className="container max-w-screen-lg mx-auto">
            <Main />
          </div>
        </main>
        <NextScript />
      </body>
    </Html>
  );
}
