"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import FloatingWidget from "./FloatingWidget";

export default function MainLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin") || pathname?.startsWith("/login");

  if (isAdmin) {
    return <div className="min-h-screen bg-transparent">{children}</div>;
  }

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <FloatingWidget />
    </>
  );
}
