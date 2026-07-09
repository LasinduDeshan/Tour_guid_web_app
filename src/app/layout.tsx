import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";
import MainLayoutWrapper from "@/components/MainLayoutWrapper";

export const metadata: Metadata = {
  title: "Ceyora Tours | Premier Travel & Tour Operator in Sri Lanka",
  description: "Experience the beauty of Sri Lanka with Ceyora Tours. We offer customized tour packages, day tours, and authentic travel experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased selection:bg-black selection:text-white">
        <Providers>
          <MainLayoutWrapper>{children}</MainLayoutWrapper>
        </Providers>
      </body>
    </html>
  );
}

