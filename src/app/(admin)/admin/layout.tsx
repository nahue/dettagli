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
    <div className="flex flex-1 dark:bg-neutral-800">
      <AppSidebar />

      <main className="flex flex-1 overflow-hidden">
        <div className="flex flex-1">
          <div className="flex h-full w-full flex-1 flex-col gap-2 rounded-tl-2xl border border-neutral-200 bg-white p-2 dark:border-neutral-700 dark:bg-neutral-900">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
