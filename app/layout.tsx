import type { Metadata } from "next";
import { Zen_Maru_Gothic } from "next/font/google";
import "./globals.css";
import Header from "./src/components/Header";
import Footer from "./src/components/Footer";

const maruGothic = Zen_Maru_Gothic({
  weight: ["300", "400", "500", "700", "900"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "To Do List",
  description: "To Do List",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={
          maruGothic.className + " " + "bg-zinc-100" + " " + "h-screen"
        }
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
