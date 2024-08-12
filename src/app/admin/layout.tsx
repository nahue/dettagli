import React from "react";

import type { Metadata } from "next";
import AppSidebar from "./_components/Sidebar";

// export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: "Dettagli | Administracion",
  description: "Panel de Administracion de Dettagli",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <AppSidebar />

      <main className="flex flex-1">

        <div className="flex h-full w-full flex-1 flex-col gap-2 bg-white p-2 dark:border-neutral-700 dark:bg-neutral-900">
          {children}
        </div>

      </main>
    </div>
  );
}
