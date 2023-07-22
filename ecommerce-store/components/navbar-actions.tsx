"use client";

import { useRouter } from "next/navigation";
import { MountedCheck } from "@/lib/mounted-check";
import useCart from "@/hooks/use-cart";

import CartDialog from "@/components/dialog/cart-dialog";

const NavbarActions = () => {
  const cart = useCart();
  const router = useRouter();

  return (
    <MountedCheck>
      <div className="flex items-center ml-auto gap-x-4">
        <CartDialog />
      </div>
    </MountedCheck>
  );
};

export default NavbarActions;
