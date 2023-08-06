"use client";

import { useState } from "react";
import { MountedCheck } from "@/lib/mounted-check";

import { Search, X } from "lucide-react";

import SearchInput from "@/components/ui/search-input";
import CartDialog from "@/components/dialog/cart-dialog";

const NavbarActions = () => {
  const [isSearchActive, setIsSearchActive] = useState(false);

  return (
    <MountedCheck>
      <nav className="flex items-center justify-end ml-auto transition-all gap-x-2">
        <div className="hidden w-56 md:flex">
          <SearchInput />
        </div>
        <div
          className={
            isSearchActive ? "transition-all w-56" : "w-0 overflow-hidden"
          }
        >
          <SearchInput />
        </div>
        {isSearchActive ? (
          <button
            onClick={() => setIsSearchActive(false)}
            className="md:hidden"
          >
            <X size={20} />
          </button>
        ) : (
          <button
            onClick={() => setIsSearchActive(true)}
            className="transition-all md:hidden "
          >
            <Search size={20} color="#d41d6d" />
          </button>
        )}
        <CartDialog />
      </nav>
    </MountedCheck>
  );
};

export default NavbarActions;
