import React from "react";
import Header from "@/app/header/Header";
import Footer from "@/app/footer/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col min-h-[100vh]">
      <Header />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
}
