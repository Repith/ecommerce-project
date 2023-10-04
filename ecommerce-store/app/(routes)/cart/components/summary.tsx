"use client";

import axios from "axios";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";

import Button from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";

const Summary = () => {
  const searchParams = useSearchParams();
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);

  useEffect(() => {
    if (searchParams.get("success")) {
      toast.success("Payment completed.");
      removeAll();
    }

    if (searchParams.get("canceled")) {
      toast.error("Something went wrong.");
    }
  }, [searchParams, removeAll]);

  const totalPrice = items.reduce((total, item) => {
    return (
      total + Number(item.product.price) * item.quantity
    );
  }, 0);

  /* Checkout API to backend */
  const onCheckout = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
        {
          productVariants: items.map((item) => ({
            productId: item.product.id,
            variantId: item.variant.id,
          })),
          quantities: items.map((item) => item.quantity),
        }
      );

      window.location = response.data.url;
      console.log(response);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.error || error.message
      );
    }
  };

  return (
    <div className="px-4 py-6 mt-16 rounded-lg bg-gray-50 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
      {/* Order summary */}
      <h2 className="text-lg font-medium text-gray-900">
        Order summary
      </h2>
      <div className="mt-6 ">
        {items.map((item) => (
          <div
            className="flex items-center justify-between py-2 border-t border-gray-200"
            key={item.product.id}
          >
            <div className="flex flex-col text-sm font-light titems-center">
              <span className="font-semibold">
                {item.product.name}
              </span>
              <div className="text-xs">
                {item.variant.colorId} |{" "}
                {item.variant.sizeId} (x{item.quantity})
              </div>
            </div>

            <Currency
              className={["font-light", "text-sm"]}
              value={item.product.price * item.quantity}
            />
          </div>
        ))}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div className="text-base font-medium text-gray-900">
            Order total
          </div>
          <Currency value={totalPrice} />
        </div>
      </div>
      <Button
        onClick={onCheckout}
        disabled={items.length === 0}
        className="w-full mt-6"
      >
        Checkout
      </Button>
    </div>
  );
};

export default Summary;
