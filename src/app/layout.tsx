'use client';

import { SessionProvider } from "next-auth/react";
import Header from "@/components/Header";
import "@/styles/globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header/>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
