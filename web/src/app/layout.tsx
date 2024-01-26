import type { Metadata } from "next";
import { inter } from "@/shared/fonts";
import "./globals.css";
import Navigation from "@/shared/components/Navigation";
import { cn } from "@/shared/utils/cn";

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
      <body className={cn(inter.className, "flex")}>
        <Navigation className="shrink-0" />

        <div className="p-5 grow max-h-screen overflow-y-auto">{children}</div>
      </body>
    </html>
  );
}
