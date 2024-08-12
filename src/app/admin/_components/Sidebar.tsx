"use client";

import React from "react";
import Link from "next/link";
import { IconBrandTabler, IconBuildingStore } from "@tabler/icons-react";
import { motion } from "framer-motion";

const links = [
  {
    label: "Principal",
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


  return (
    <div id="sidebar" className="hidden border-r bg-muted/40 lg:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-[60px] items-center border-b px-6">
          <Link
            href="/"
            className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
          >
            <Logo />
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-4 text-sm font-medium">
            {links.map((link, idx) => (
              <Link
                href={link.href}
                key={idx}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                prefetch={false}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
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
    <>
      <div className="h-5 w-6 flex-shrink-0 rounded-bl-sm rounded-br-lg rounded-tl-lg rounded-tr-sm bg-black dark:bg-white" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="whitespace-pre font-medium text-black dark:text-white"
      >
        Dettagli
      </motion.span>
    </>
  );
};
