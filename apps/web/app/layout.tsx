import "./globals.css";
import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import { SocketProvider } from "../context/SocketProvider";

const work_Sans = Work_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "chat-app",
  description: "Generated by create turbo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <SocketProvider>
        <body className={`${work_Sans.className} min-h-screen antialiased`}>{children}</body>
      </SocketProvider>
    </html>
  );
}
