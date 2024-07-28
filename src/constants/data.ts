import { type NavItem } from "~/types";

export type User = {
  id: number;
  name: string;
  company: string;
  role: string;
  verified: boolean;
  status: string;
};

export type Product = {
  id: number;
  name: string;
  featuredImage: string;
};

export const products: Product[] = [
  {
    id: 1,
    name: "Candice Schiner",
    featuredImage:
      "https://utfs.io/f/bcc7d907-98fa-42d7-af88-97a8faa1535e-gt99c8.jpeg",
  },
  {
    id: 2,
    name: "Candice Schiner",
    featuredImage:
      "https://utfs.io/f/a87214c7-d1ab-4a0d-b3c9-f679d95119d6-m36kwb.jpeg",
  },
  {
    id: 3,
    name: "Candice Schiner",
    featuredImage:
      "https://utfs.io/f/2a47910b-fa47-4117-b64b-58a8b82b8e3b-svukre.jpeg",
  },
];

export const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: "dashboard",
    label: "Dashboard",
  },
  {
    title: "Productos",
    href: "/admin/products",
    icon: "shoppingbag",
    label: "Productos",
  },
  //   {
  //     title: "Employee",
  //     href: "/dashboard/employee",
  //     icon: "employee",
  //     label: "employee",
  //   },
  //   {
  //     title: "Profile",
  //     href: "/dashboard/profile",
  //     icon: "profile",
  //     label: "profile",
  //   },
  //   {
  //     title: "Kanban",
  //     href: "/dashboard/kanban",
  //     icon: "kanban",
  //     label: "kanban",
  //   },
  //   {
  //     title: "Login",
  //     href: "/",
  //     icon: "login",
  //     label: "login",
  //   },
];
