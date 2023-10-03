"use client";
import Link from "next/link";
import IconButton from "./ui/icon-button";
import { X } from "lucide-react";
import { Fragment } from "react";
import { usePathname } from "next/navigation";
import { Dialog, Transition } from "@headlessui/react";

import { cn } from "@/lib/utils";
import { Category } from "@/types";
import SearchInput from "./ui/search-input";

interface MainNavProps {
  data: Category[];
  isOpen?: boolean;
  onClose?: () => void;
}

const MainNav: React.FC<MainNavProps> = ({
  data,
  isOpen = false,
  onClose,
}) => {
  const pathname = usePathname();

  const routes = data.map((route) => ({
    href: `/category/${route.id}`,
    label: route.name,
    active: pathname === `/category/${route.id}`,
  }));

  return (
    <Fragment>
      {/* Desktop menu */}
      <nav className="items-center justify-between hidden md:flex ">
        <div className="mx-6 space-x-6 lg:space-x-8">
          {routes.map((route) => (
            <Link
              href={route.href}
              key={route.href}
              className={cn(
                "text-base font-medium transition-all hover:text-black hover:border-b-4 hover:border-[#f9dee8] hover:py-2 ",
                route.active
                  ? "text-black border-accent border-b-4 py-2"
                  : "text-neutral-500"
              )}
            >
              {route.label}
            </Link>
          ))}
        </div>
        {/* <div className="flex px-2">
          <SearchInput />
        </div> */}
      </nav>

      {/* Mobile menu */}
      <Transition show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-30 flex items-start justify-center"
          onClose={onClose ?? (() => {})}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-[-100%]"
            enterTo="opacity-100 translate-y-0"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-[-100%]"
          >
            <Dialog.Overlay className="fixed inset-0" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-[-100%]"
            enterTo="opacity-100 translate-y-0"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-[-100%]"
          >
            <div className="w-full p-4 mx-auto bg-white rounded-lg shadow-lg shadow-accent/10 ">
              {/* Close button */}
              <div className="absolute top-0 right-0 items-center justify-end p-4">
                <IconButton
                  icon={<X size={15} />}
                  onClick={onClose}
                />
              </div>

              {/* Categories */}
              <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left">
                    <Dialog.Title className="text-lg font-medium leading-6 text-gray-900">
                      Categories
                    </Dialog.Title>
                    <div className="mt-2">
                      {routes.map((route) => (
                        <Link
                          href={route.href}
                          key={route.href}
                          className={cn(
                            "text-base font-medium transition-all hover:text-black hover:border-b-4 hover:border-[#f9dee8] hover:py-2 block mt-4",
                            route.active
                              ? "text-black border-accent border-b-4 py-2"
                              : "text-neutral-500"
                          )}
                          onClick={onClose}
                        >
                          {route.label}
                        </Link>
                      ))}
                    </div>
                    <div className="pt-6">
                      <SearchInput />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition>
    </Fragment>
  );
};

export default MainNav;
