"use client";

import { Sidebar, SidebarBody, SidebarLink } from "~/components/ui/sidebar";

import React, { useState } from "react";
// import { DashboardNav } from "@/components/dashboard-nav";
import { navItems } from "~/constants/data";
import { cn } from "~/utils/style";
import { ChevronLeft } from "lucide-react";
// import { useSidebar } from "@/hooks/useSidebar";
import Link from "next/link";
import { DashboardNav } from "./DashboardNav";
import { IconBrandTabler, IconBuildingStore } from "@tabler/icons-react";
import { motion } from "framer-motion";

const links = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: (
      <IconBrandTabler className="h-5 w-5 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />
    ),
  },
  {
    label: "Productos",
    href: "/admin/products",
    icon: (
      <IconBuildingStore className="h-5 w-5 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />
    ),
  },
];

export default function AppSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <Sidebar open={open} setOpen={setOpen} animate={false}>
      <SidebarBody className="justify-between gap-10">
        <div className="flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <>
            <Logo />
          </>
          <div className="mt-8 flex flex-col gap-2">
            {links.map((link, idx) => (
              <SidebarLink key={idx} link={link} />
            ))}
          </div>
        </div>
      </SidebarBody>
    </Sidebar>
  );

  //   return (
  //     <aside
  //       className={cn(
  //         `relative hidden h-screen flex-none border-r bg-card transition-[width] duration-500 md:block`,
  //         // !isMinimized ? "w-72" : "w-[72px]",
  //         "w-72",
  //         className,
  //       )}
  //     >
  //       <div className="hidden p-5 pt-10 lg:block">
  //         <Link
  //           href={"https://github.com/Kiranism/next-shadcn-dashboard-starter"}
  //           target="_blank"
  //         >
  //           <svg
  //             xmlns="http://www.w3.org/2000/svg"
  //             viewBox="0 0 24 24"
  //             fill="none"
  //             stroke="currentColor"
  //             strokeWidth="2"
  //             strokeLinecap="round"
  //             strokeLinejoin="round"
  //             className="mr-2 h-6 w-6"
  //           >
  //             <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
  //           </svg>
  //         </Link>
  //       </div>
  //       <ChevronLeft
  //         className={cn(
  //           "absolute -right-3 top-10 z-50 cursor-pointer rounded-full border bg-background text-3xl text-foreground",
  //           //   isMinimized && "rotate-180",
  //         )}
  //         // onClick={handleToggle}
  //       />
  //       <div className="space-y-4 py-4">
  //         <div className="px-3 py-2">
  //           <div className="mt-3 space-y-1">
  //             <DashboardNav items={navItems} />
  //           </div>
  //         </div>
  //       </div>
  //     </aside>
  //   );
}

export const Logo = () => {
  return (
    <Link
      href="/admin"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <div className="h-5 w-6 flex-shrink-0 rounded-bl-sm rounded-br-lg rounded-tl-lg rounded-tr-sm bg-black dark:bg-white" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="whitespace-pre font-medium text-black dark:text-white"
      >
        Dettagli
      </motion.span>
    </Link>
  );
};
