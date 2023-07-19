"use client";

import Container from "@/components/ui/container";
import useCart from "@/hooks/use-cart";

import Summary from "./components/summary";
import CartItem from "./components/cart-item";
import { MountedCheck } from "@/lib/mounted-check";

const CartPage = () => {
  const cart = useCart();

  return (
    <MountedCheck>
      <div className="bg-white">
        <Container>
          <div className="px-4 py-16 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-black">Shopping Cart</h1>
            <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
              <div className="sm:col-span-7">
                {cart.items.length === 0 && (
                  <p className="text-neutral-500">No items added to cart.</p>
                )}
                <ul>
                  {cart.items.map((item) => (
                    <CartItem key={item.id} data={item} />
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
