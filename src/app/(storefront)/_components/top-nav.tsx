import Link from "next/link";
import React from "react";

const TopNav = () => {
  return (
    <nav className="relative flex items-center justify-between p-4 lg:px-6">
      <div className="flex w-full items-center">
        {/* Left side */}
        <div className="flex w-full md:w-1/3">
          <span className="ml-2 flex-none select-none text-sm font-medium uppercase md:hidden lg:block">
            Dettagli
          </span>

          <ul className="ml-8 hidden gap-6 text-sm md:flex md:items-center">
            <li>
              <Link
                href="/productos"
                className="text-neutral-500 underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300"
              >
                Productos
              </Link>
            </li>
            <li>
              <Link
                href="/guia-de-talles"
                className="text-neutral-500 underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300"
              >
                Guia de Talles
              </Link>
            </li>
            <li>
              <Link
                href="/contacto"
                className="text-neutral-500 underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300"
              >
                Contacto
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default TopNav;
