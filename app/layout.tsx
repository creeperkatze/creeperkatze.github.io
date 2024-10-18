import { Lexend } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";

const lexend = Lexend({ weight: "700", subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={lexend.className}>{children}</body>
    </html>
  );
}

export const metadata: Metadata = {
  title: "| Creeperkatze",
};
