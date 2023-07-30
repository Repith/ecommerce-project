"use client";

import { useRouter } from "next/navigation";

import { MountedCheck } from "@/lib/mounted-check";
import useCart from "@/hooks/use-cart";

import SearchBar from "@/components/ui/search-bar";

import CartDialog from "@/components/dialog/cart-dialog";

const NavbarActions = () => {
  const cart = useCart();
  const router = useRouter();

  return (
    <MountedCheck>
      <div className="flex items-center justify-between ml-auto gap-x-2">
        <SearchBar />
        <CartDialog />
      </div>
    </MountedCheck>
  );
};

export default NavbarActions;
