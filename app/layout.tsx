import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/shared/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Flashy Learners",
  description: "Learn and memorize things, using your custom flashcards, or discover already public flashcards.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-[100dvh]`}>
        <ClerkProvider>
          <Header />
          {children}  
        </ClerkProvider>
      </body>
    </html>
  );
}
