import "@/styles/globals.css";
import Providers from "@/components/Providers";
import { Navbar } from "@/components/organisms/Navbar";
import { Loader } from "@/components/Loader";

export const metadata = {
  title: "cardvote.app",
  description: "Planning to the Next Level!",
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout(props: Props) {
  const { children } = props;

  return (
    <html lang="en" className="bg-base-100">
      <body className="container max-w-screen-lg mx-auto px-4">
        <Providers>
          <Loader>
            <Navbar />
            <main>{children}</main>
          </Loader>
        </Providers>
      </body>
    </html>
  );
}
