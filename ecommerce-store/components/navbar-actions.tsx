"use client";
import { ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";

import { MountedCheck } from "@/lib/mounted-check";
import Button from "@/components/ui/button";
import useCart from "@/hooks/use-cart";

const NavbarActions = () => {
  const cart = useCart();
  const router = useRouter();

  return (
    <MountedCheck>
      <div className="flex items-center ml-auto gap-x-4">
        <Button
          onClick={() => router.push("/cart")}
          className="flex items-center px-4 py-2 bg-black rounded-full"
        >
          <ShoppingBag size={20} color="white" />
          <span className="ml-2 text-sm font-medium text-white">
            {cart.items.length}
          </span>
        </Button>
      </div>
    </MountedCheck>
  );
};

export default NavbarActions;
