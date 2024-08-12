import React from "react";

import type { Metadata } from "next";
import AppSidebar from "./_components/Sidebar";
import Link from "next/link";
import { Package2Icon } from "lucide-react";

// export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: "Dettagli | Administracion",
  description: "Panel de Administracion de Dettagli",
};

export default async function Layout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <AppSidebar />

      <main className="flex flex-col">
        <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-muted/40 px-6">
          <Link href="#" className="lg:hidden" prefetch={false}>
            <Package2Icon className="h-6 w-6" />
            <span className="sr-only">Home</span>
          </Link>
          <div className="w-full flex-1">

          </div>

        </header>
        {children}


      </main>
    </div>
  );
}
