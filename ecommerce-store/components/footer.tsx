import { Facebook, Instagram, Youtube } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-center h-40 mt-10 bg-stone-950">
      <div className="flex items-center justify-between w-full px-6 py-6 border-b-2 border-zinc-700 max-w-7xl">
        <Link href="/" className="py-2 text-xl font-bold text-white align-top">
          STORE4U
        </Link>
        <div className="flex gap-x-6">
          <Link href="/">
            <Facebook color="white" size={36} />
          </Link>
          <Link href="/">
            <Youtube color="white" size={36} />
          </Link>
          <Link href="/">
            <Instagram color="white" size={36} />
          </Link>
        </div>
        <div className="mr-20"></div>
      </div>
      <div className="flex py-6">
        <p className="text-xs text-white">
          &copy; 2023 Store4U, Repith Project. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
