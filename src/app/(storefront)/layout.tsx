import "@/styles/globals.css";

import { type Metadata } from "next";
import TopNav from "./_components/top-nav";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "../api/uploadthing/core";
import Link from "next/link";
import { FacebookIcon, InstagramIcon, TwitterIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "Dettagli",
  description: "Dettagli",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />

      <TopNav />
      {children}

      <footer className="bg-muted-foreground/10 py-8">
        <div className="container grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
          <nav>
            <ul>
              <li>
                <a className="block p-2 text-lg underline-offset-4 hover:text-black hover:underline md:inline-block md:text-sm dark:hover:text-neutral-300 text-black dark:text-neutral-300" href="/">Inicio</a>
              </li>
              <li>
                <a className="block p-2 text-lg underline-offset-4 hover:text-black hover:underline md:inline-block md:text-sm dark:hover:text-neutral-300" href="/productos">Productos</a>
              </li>
              <li>
                <a className="block p-2 text-lg underline-offset-4 hover:text-black hover:underline md:inline-block md:text-sm dark:hover:text-neutral-300" href="/guia-de-talles">Guia de Talles</a></li>
              <li><a className="block p-2 text-lg underline-offset-4 hover:text-black hover:underline md:inline-block md:text-sm dark:hover:text-neutral-300" href="/contacto">Contacto</a></li>
            </ul>
          </nav>

          <div className="space-y-2">
            <h4 className="font-semibold">Nuestras Redes</h4>
            <div className="flex gap-2">
              <Link href="https://www.instagram.com/dettagli.ok" className="text-muted-foreground hover:text-foreground" prefetch={false}>
                <InstagramIcon className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
