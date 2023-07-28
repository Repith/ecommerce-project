"use client";

import Container from "@/components/ui/container";
import useCart from "@/hooks/use-cart";

import Summary from "./components/summary";
import CartItem from "./components/cart-item";
import { MountedCheck } from "@/lib/mounted-check";
import { Info } from "lucide-react";

const CartPage = () => {
  const cart = useCart();

  return (
    <MountedCheck>
      <div className="bg-white">
        <Container>
          <div className="px-4 py-16 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-black">Shopping Cart</h1>
            <div className="flex py-2">
              <Info
                size={18}
                color="#3070d9"
                // className="opacity-0 sm:opacity-100"
                strokeWidth={0.75}
              />
              <p className="text-xs text-blue-500 md:text-sm font-extralight ">
                &nbsp;Do not wait with the purchase, adding items to the basket
                does not mean booking them!
              </p>
            </div>
            <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
              <div className="sm:col-span-7">
                {cart.items.length === 0 && (
                  <p className="text-neutral-500">No items added to cart.</p>
                )}
                <ul>
                  {cart.items.map((item) => (
                    <CartItem key={item.product.id} data={item} />
                  ))}
                </ul>
              </div>
              <Summary />
            </div>
          </div>
        </Container>
      </div>
    </MountedCheck>
  );
};

export default CartPage;
