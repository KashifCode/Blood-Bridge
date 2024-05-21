import React from "react";
import RenderMobileOrPC from "./components/RenderMobileOrPC";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="relative flex flex-col min-h-[100vh]">
            <RenderMobileOrPC>
                {children}
            </RenderMobileOrPC>
        </div>
    );
}
