import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Squashies Shop",
  description: "Der Squashies Shop wird vorbereitet.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
