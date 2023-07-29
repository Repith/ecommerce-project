import Link from "next/link";

const Footer = () => {
  return (
    <footer className="flex items-center justify-center h-32 mt-10 bg-stone-950">
      <div className="flex items-center justify-between w-full px-6 max-w-7xl">
        <div>
          <Link
            href="/"
            className="py-2 text-xl font-bold text-white align-top"
          >
            STORE4U
          </Link>
        </div>
        <div>
          <p className="text-xs text-white">
            &copy; 2023 Store4U, Repith Project. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
