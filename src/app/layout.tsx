import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LingoScore - Master All 4 English Skills",
  description: "Assess your Reading, Listening, Writing, and Speaking skills with AI-driven analysis.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
