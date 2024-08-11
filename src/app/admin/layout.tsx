import React from "react";

import type { Metadata } from "next";
import AppSidebar from "./_components/Sidebar";

export const metadata: Metadata = {
  title: "Next Shadcn Dashboard Starter",
  description: "Basic dashboard with Next.js and Shadcn",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <AppSidebar />

      <main className="flex flex-1 overflow-hidden">

        <div className="flex h-full w-full flex-1 flex-col gap-2 bg-white p-2 dark:border-neutral-700 dark:bg-neutral-900">
          {children}
        </div>

      </main>
    </div>
  );
}
