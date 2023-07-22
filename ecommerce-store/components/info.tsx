"use client";
import { ShoppingCart } from "lucide-react";

import { Product } from "@/types";
import Currency from "@/components/ui/currency";
import Button from "@/components/ui/button";
import useCart from "@/hooks/use-cart";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import SizeTable from "./size-table";

interface InfoProps {
  data: Product;
}

const Info: React.FC<InfoProps> = ({ data }) => {
  const cart = useCart();

  const onAddToCart = () => {
    cart.addItem(data);
  };
  return (
    <div>
      {/* Name */}
      <h1 className="text-3xl font-bold text-gray-900">{data.name}</h1>

      {/* Price */}
      <div className="flex items-end justify-between mt-3">
        <p className="text-2xl text-gray-900">
          <Currency value={data.price} />
        </p>
      </div>
      <hr className="my-4" />

      {/* Size and Color */}
      <div className="flex flex-col gap-y-4">
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Size:</h3>
          <div>{data?.size?.name}</div>
        </div>
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Color:</h3>
          <div
            className="w-6 h-6 border border-gray-600 rounded-full"
            style={{ backgroundColor: data?.color?.value }}
          ></div>
        </div>

        {/* Description */}
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Description</AccordionTrigger>
            <AccordionContent>{data?.description}</AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Description */}
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Size table</AccordionTrigger>
            <AccordionContent>
              <SizeTable />
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Add to cart */}
        <div className="flex items-center mt-4 gap-x-3">
          <Button onClick={onAddToCart} className="flex items-center gap-x-2">
            Add To Cart
            <ShoppingCart size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Info;
