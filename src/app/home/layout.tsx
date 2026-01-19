import React from "react";
import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";
export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex justify-between max-w-[1280px] mx-auto">
      <LeftSidebar />
      <main className="flex-1 max-w-[600px] min-h-screen border-x border-border">
        {children}
      </main>
      <RightSidebar />
    </div>
  );
}
