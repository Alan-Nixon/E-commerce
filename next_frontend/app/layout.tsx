"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./user/navbar";
import Footer from "./user/footer";
import { usePathname } from "next/navigation";
import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

const inter = Inter({ subsets: ["latin"] });

const bannedNavFooter = ["/user/login", "/user/register"];

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const pathName = usePathname();

  return (
    <html lang="en">
      <title>Av Costumes</title>
      <body className={inter.className}>
        <SessionProvider>
          {!bannedNavFooter.includes(pathName) && <Navbar />}
          {children}
          {!bannedNavFooter.includes(pathName) && <Footer />}
        </SessionProvider>
      </body>
    </html>
  );
}
