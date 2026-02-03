import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Contract Guard - Stop Signing Contracts That Will Screw You",
  description: "AI-powered contract analysis for small businesses. Spot risky clauses before you sign. $9.99 per review or $99/month unlimited.",
  keywords: ["contract review", "legal AI", "contract analyzer", "small business legal", "NDA review", "contract risks"],
  openGraph: {
    title: "Contract Guard - AI Contract Analysis",
    description: "Stop getting screwed by bad contracts. AI-powered legal analysis in plain English.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-zinc-950 text-zinc-50`}>
        {children}
      </body>
    </html>
  );
}
