import Link from "next/link";

import MainNav from "@/components/main-nav";
import Container from "@/components/ui/container";

const Navbar = () => {
  return (
    <div className="border-b">
      <Container>
        <div className="relative px-4 sm:px-6 flex h-16 items-center">
          <Link href="/" className="ml-r flex lg:ml-0 gap-x-2">
            <p className="font-bold text-xl">STORE</p>
          </Link>
          <MainNav />
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
