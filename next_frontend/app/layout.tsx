"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from 'next-auth/react';
import { ProtectedRoute } from "./protected";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {

  return (
    <html lang="en">
      <title>Av Costumes</title>
      <body className={inter.className}>
        <SessionProvider>
            {children}
        </SessionProvider>
      </body>
    </html>
  );
}
