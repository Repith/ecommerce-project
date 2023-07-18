"use client";
import { ShoppingBag } from "lucide-react";

import Button from "@/components/ui/button";
import { MountedCheck } from "@/lib/mounted-check";

const NavbarActions = () => {
  return (
    <MountedCheck>
      <div className="flex items-center ml-auto gap-x-4">
        <Button className="flex items-center px-4 py-2 bg-black rounded-full">
          <ShoppingBag size={20} color="white" />
          <span className="ml-2 text-sm font-medium text-white">0</span>
        </Button>
      </div>
    </MountedCheck>
  );
};

export default NavbarActions;
