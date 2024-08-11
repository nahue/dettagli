import "@/styles/globals.css";

import { type Metadata } from "next";
import TopNav from "./_components/top-nav";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "../api/uploadthing/core";

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
    </>
  );
}
