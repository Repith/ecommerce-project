import { UserButton, auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { MainNav } from "@/components/main-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import StoreSwitcher from "@/components/store-switcher";
import prismadb from "@/lib/prismadb";

const Navbar = async () => {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const stores = await prismadb.store.findMany({
    where: {
      userId,
    },
  });

  return (
    <div>
      <div className="flex justify-end pt-4 pr-8 space-x-4">
        <ThemeToggle />
        <UserButton afterSignOutUrl="/" />
      </div>
      <div className="fixed top-0 left-0 h-screen border-r">
        <div className="flex flex-col items-center h-full px-4 py-2 space-y-4">
          <StoreSwitcher items={stores} />
          <MainNav className="mx-6" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
