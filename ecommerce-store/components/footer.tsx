import { Facebook, Instagram, Youtube } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import logo from "../public/logo-black.png";

const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-center h-48 mt-10 bg-stone-950">
      <nav className="flex items-center justify-between w-full py-6 border-b-2 border-zinc-700 max-w-7xl">
        <Link href="/" className="flex pl-2 lg:ml-0 gap-x-2 md:pl-0">
          <Image src={logo} alt="logo" height={36} width={100} />
        </Link>
        <section className="flex pr-2 md:pr-0 gap-x-6">
          <Link href="/">
            <Facebook color="white" size={36} />
          </Link>
          <Link href="/">
            <Youtube color="white" size={36} />
          </Link>
          <Link href="/">
            <Instagram color="white" size={36} />
          </Link>
        </section>
        <div className="hidden mr-20 md:flex"></div>
      </nav>
      <section className="flex py-6">
        <p className="text-xs text-white">
          &copy; 2023 Store4U, Repith Project. All rights reserved.
        </p>
      </section>
    </footer>
  );
};

export default Footer;
