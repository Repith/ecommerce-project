import { useRouter } from "next/navigation";
import { useState, Fragment } from "react";
import { ShoppingBag, X } from "lucide-react";
import { Dialog, Transition } from "@headlessui/react";

import { MountedCheck } from "@/lib/mounted-check";
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

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <MountedCheck>
      <Button
        onClick={onOpen}
        className="flex items-center px-5 py-3 bg-black rounded-l-none rounded-r-lg"
      >
        <ShoppingBag size={20} color="white" />
        <span className="ml-2 text-sm font-medium text-white">
          {totalItems}
        </span>
      </Button>
      <Transition show={open} as={Fragment}>
        <Dialog
          open={open}
          as="div"
          className="relative z-40 shadow-xl"
          onClose={onClose}
        >
          {/* Background color and opacity */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          {/* Dialog position */}
          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
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
                              <CartItemDialog
                                key={item.product.id}
                                data={item}
                              />
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
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </MountedCheck>
  );
};

export default CartDialog;
