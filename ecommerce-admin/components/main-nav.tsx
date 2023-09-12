"use client";

import Link from "next/link";
import {
  useParams,
  usePathname,
  useRouter,
} from "next/navigation";
import {
  AppWindow,
  Box,
  Copy,
  LayoutDashboard,
  Palette,
  Ruler,
  Settings,
  ShoppingCart,
} from "lucide-react";

import { cn } from "@/lib/utils";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();

  const routes = [
    {
      href: `/${params.storeId}`,
      label: "Overview",
      active: pathname === `/${params.storeId}`,
      icon: <LayoutDashboard size={16} />,
    },
    {
      href: `/${params.storeId}/billboards`,
      label: "Billboards",
      active: pathname === `/${params.storeId}/billboards`,
      icon: <AppWindow size={16} />,
    },
    {
      href: `/${params.storeId}/categories`,
      label: "Categories",
      active: pathname === `/${params.storeId}/categories`,
      icon: <Copy size={16} />,
    },
    {
      href: `/${params.storeId}/sizes`,
      label: "Sizes",
      active: pathname === `/${params.storeId}/sizes`,
      icon: <Ruler size={16} />,
    },
    {
      href: `/${params.storeId}/colors`,
      label: "Colors",
      active: pathname === `/${params.storeId}/colors`,
      icon: <Palette size={16} />,
    },
    {
      href: `/${params.storeId}/products`,
      label: "Products",
      active: pathname === `/${params.storeId}/products`,
      icon: <Box size={16} />,
    },
    {
      href: `/${params.storeId}/orders`,
      label: "Orders",
      active: pathname === `/${params.storeId}/orders`,
      icon: <ShoppingCart size={16} />,
    },
    {
      href: `/${params.storeId}/settings`,
      label: "Settings",
      active: pathname === `/${params.storeId}/settings`,
      icon: <Settings size={16} />,
    },
  ];

  return (
    <nav
      className={cn(
        "flex flex-col pt-2 items-start space-y-4 lg:space-y-6",
        className
      )}
    >
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "flex flex-row items-center text-base font-medium transition-colors hover:text-primary",
            route.active
              ? "text-black dark:text-white"
              : "text-muted-foreground"
          )}
        >
          {route.icon}
          <span className="ml-2">{route.label}</span>
        </Link>
      ))}
    </nav>
  );
}
