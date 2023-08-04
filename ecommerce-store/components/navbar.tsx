import Link from "next/link";

import MainNav from "@/components/main-nav";
import Container from "@/components/ui/container";
import getCategories from "@/actions/get-categories";
import NavbarActions from "@/components/navbar-actions";

const Navbar = async () => {
  const categories = await getCategories();

  return (
    <div className="sticky top-0 z-10 py-4 bg-white border-b-2 shadow-md border-accent/10 shadow-accent/5">
      <Container>
        <div className="relative flex items-center h-16 px-4 sm:px-6">
          <div className="px-3 py-2 text-xl font-bold text-white rounded-l-md bg-stone-950">
            <Link href="/" className="flex ml-r lg:ml-0 gap-x-2">
              STORE4U
            </Link>
          </div>

          <MainNav data={categories} />

          <NavbarActions />
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
