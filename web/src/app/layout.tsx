import type { Metadata } from "next";
import { inter } from "@/shared/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Demo Web App",
  description: "App using Next.js for experiments.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
