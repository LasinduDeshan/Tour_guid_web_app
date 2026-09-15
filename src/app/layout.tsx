import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";
import MainLayoutWrapper from "@/components/MainLayoutWrapper";

export const metadata: Metadata = {
  title: "Windmark Tours | Sri Lanka Travel & Tours",
  description: "Experience the beauty of Sri Lanka with Windmark Tours. We offer customized tour packages, day tours, and authentic travel experiences.",
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

