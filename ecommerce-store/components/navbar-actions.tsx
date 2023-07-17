"use client";
import { ShoppingBag } from "lucide-react";

import Button from "@/components/ui/button";
import MountedCheck from "@/lib/utils";

const NavbarActions = () => {
  return (
    <MountedCheck>
      <div className="ml-auto flex items-center gap-x-4">
        <Button className="flex items-center rounded-full bg-black px-4 py-2">
          <ShoppingBag size={20} color="white" />
          <span className="ml-2 text-sm font-medium text-white">0</span>
        </Button>
      </div>
    </MountedCheck>
  );
};

export default NavbarActions;
