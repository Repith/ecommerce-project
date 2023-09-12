"use client";
import { UserButton } from "@clerk/nextjs";
import { useState } from "react";

import { Menu } from "lucide-react";
import { MainNav } from "@/components/main-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import StoreSwitcher, {
  StoreSwitcherProps,
} from "@/components/store-switcher";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const Navbar = ({ items }: StoreSwitcherProps) => {
  const [open, setOpen] = useState(false);

  const onClick = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div>
      <div className="flex justify-between pt-4 pr-8 space-x-4">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="hover:bg-transparent"
            >
              <Menu className="w-10 h-10 p-1 ml-4 transition-all border-2 rounded-md text-muted-foreground md:opacity-0 hover:text-zinc-600 hover:border-zinc-500" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="flex justify-start gap-0 p-4"
          >
            <div className="flex flex-col items-center space-y-2 ">
              <StoreSwitcher items={items} />
              <div onClick={onClick}>
                <MainNav className="mx-6" />
              </div>
            </div>
          </SheetContent>
        </Sheet>
        <div className="flex gap-x-4">
          <ThemeToggle />
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
      <div className="fixed top-0 left-0 h-screen border-r">
        <div className="flex-col items-center hidden h-full px-4 py-2 space-y-4 md:flex">
          <StoreSwitcher items={items} />
          <MainNav className="mx-6" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
