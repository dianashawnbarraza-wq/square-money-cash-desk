import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppShell } from "@/components/shell";
import { MoneyProvider } from "@/lib/store";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cash Desk · Dave's Plumbing & Rooter",
  description:
    "Square Money Cash Desk for Dave's Plumbing & Rooter. See what you can spend, what is settling, and what needs a decision before Friday.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <MoneyProvider>
          <AppShell>{children}</AppShell>
        </MoneyProvider>
      </body>
    </html>
  );
}
