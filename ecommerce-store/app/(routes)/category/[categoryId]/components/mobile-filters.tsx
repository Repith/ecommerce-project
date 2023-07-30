"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Dialog } from "@headlessui/react";

import IconButton from "@/components/ui/icon-button";
import Button from "@/components/ui/button";
import { Color, Size } from "@/types";

import Filter from "./filter";
import { MountedCheck } from "@/lib/mounted-check";

interface MobileFiltersProps {
  sizes: Size[];
  colors: Color[];
}

const MobileFilters: React.FC<MobileFiltersProps> = ({ sizes, colors }) => {
  const [open, setOpen] = useState(false);

  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);

  return (
    <>
      <MountedCheck>
        <Button
          onClick={onOpen}
          className="flex items-center gap-x-2 lg:hidden"
        >
          Filters
          <Plus size={20} />
        </Button>

        <Dialog
          open={open}
          as="div"
          className="relative z-40 lg:hidden"
          onClose={onClose}
        >
          {/* Background color and opacity */}
          <div className="fixed inset-0 bg-black bg-opacity-25" />

          {/* Dialog position */}
          <div className="fixed inset-0 z-40 flex">
            <Dialog.Panel className="relative flex flex-col w-full h-full max-w-xs py-4 pb-6 ml-auto overflow-y-auto bg-white shadow-xl">
              {/* Close button */}
              <div className="flex items-center justify-end px-4">
                <IconButton icon={<X size={15} />} onClick={onClose} />
              </div>

              <div className="p-4">
                <Filter valueKey="sizeId" name="Sizes" data={sizes} />
                <Filter valueKey="colorId" name="Colors" data={colors} />
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      </MountedCheck>
    </>
  );
};

export default MobileFilters;
