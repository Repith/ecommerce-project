import { useRouter } from "next/navigation";
import { useState } from "react";
import { ShoppingBag, X } from "lucide-react";
import { Dialog } from "@headlessui/react";

import { MountedCheck } from "@/lib/mounted-check";
import { Product } from "@/types";
import useCart from "@/hooks/use-cart";

import Button from "@/components/ui/button";
import Container from "@/components/ui/container";
import IconButton from "@/components/ui/icon-button";
import CartItemDialog from "@/components/dialog/cart-item-dialog";
import DialogSummary from "@/components/dialog/summary-dialog";

const CartDialog = () => {
  const [open, setOpen] = useState(false);

  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);

  const router = useRouter();
  const cart = useCart();
  const items = useCart((state) => state.items);

  const toCheckout = () => {
    router.push("/cart");
    onClose();
  };

  return (
    <MountedCheck>
      <Button
        onClick={onOpen}
        className="flex items-center px-4 py-2 bg-black rounded-full"
      >
        <ShoppingBag size={20} color="white" />
        <span className="ml-2 text-sm font-medium text-white">
          {cart.items.length}
        </span>
      </Button>

      <Dialog
        open={open}
        as="div"
        className="relative z-40 shadow-xl"
        onClose={onClose}
      >
        {/* Background color and opacity */}
        <div className="fixed inset-0 bg-black bg-opacity-25" />

        {/* Dialog position */}
        <div className="fixed inset-0 z-40 flex">
          <Dialog.Panel className="relative flex flex-col w-full h-full max-w-md py-4 ml-auto overflow-y-auto bg-white shadow-xl">
            {/* Close button */}
            <div className="flex items-center justify-end px-4">
              <IconButton icon={<X size={15} />} onClick={onClose} />
            </div>
            {/* Item(s) container */}
            <div className="p-4">
              <Container>
                <div className="px-2 ">
                  <h1 className="text-3xl font-bold text-black">
                    Shopping Cart
                  </h1>
                  <div className="">
                    <div className="py-4">
                      {cart.items.length === 0 && (
                        <p className="text-neutral-500">
                          No items added to cart.
                        </p>
                      )}
                      <ul>
                        {cart.items.map((item) => (
                          <CartItemDialog key={item.id} data={item} />
                        ))}
                      </ul>
                    </div>

                    {/* Summary */}
                    <DialogSummary />
                  </div>
                </div>
              </Container>
            </div>
            {/* Checkout button */}
            <div className="px-6">
              <Button
                onClick={toCheckout}
                disabled={items.length === 0}
                className="w-full"
              >
                Go to checkout
              </Button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </MountedCheck>
  );
};

export default CartDialog;
