"use client";

import axios from "axios";

import Button from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";

import { MountedCheck } from "@/lib/mounted-check";

const DialogSummary = () => {
  const items = useCart((state) => state.items);

  const totalPrice = items.reduce((total, item) => {
    return total + Number(item.product.price) * item.quantity;
  }, 0);

  return (
    <MountedCheck>
      <div className="flex items-center justify-between py-2 ">
        <div className="text-base font-medium text-gray-900">Order total</div>
        <Currency value={totalPrice} />
      </div>
    </MountedCheck>
  );
};

export default DialogSummary;
