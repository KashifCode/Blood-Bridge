import React from "react";
import RenderMobileOrPcBB from "./profile/components/RenderMobileOrPcBB";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col min-h-[100vh]">
      <RenderMobileOrPcBB>
        {children}
      </RenderMobileOrPcBB>
    </div>
  );
}
