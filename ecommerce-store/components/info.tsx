"use client";
import React, { useState } from "react";
import { ShoppingCart } from "lucide-react";

import { Color, Product } from "@/types";
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
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [filteredSizeOptions, setFilteredSizeOptions] = useState<string[]>([]);

  const colorOptions = Array.from(
    new Set(data.variants.map((variant) => variant.colorId))
  );

  const onColorSelect = (color: string) => {
    setSelectedColor(color);
    const relatedVariants = data.variants.filter(
      (variant) => variant.colorId === color
    );
    const relatedSizes = Array.from(
      new Set(relatedVariants.map((variant) => variant.sizeId))
    );
    setFilteredSizeOptions(relatedSizes);
  };

  const onAddToCart = () => {
    const variantToAdd = data.variants.find(
      (variant) =>
        variant.colorId === selectedColor && variant.sizeId === selectedSize
    );

    console.log("INFO - Data", data);
    console.log("INFO - VariantToADD", variantToAdd);

    if (variantToAdd) {
      console.log("Selected Variant ID: ", variantToAdd);
      cart.addItem(data, variantToAdd);
    }
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
          <h3 className="font-semibold text-black">Color:</h3>
          {colorOptions.map((color, index) => (
            <Button
              key={index}
              onClick={() => onColorSelect(color)}
              className={`border-2 p-3 text-xs ${
                selectedColor === color
                  ? "border-primary-500 bg-black"
                  : "border-gray-500 bg-white text-black"
              }`}
            >
              {color}
            </Button>
          ))}
        </div>

        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Size:</h3>
          {filteredSizeOptions.map((size, index) => (
            <Button
              key={index}
              onClick={() => setSelectedSize(size)}
              className={`border-2 p-3 text-xs ${
                selectedSize === size
                  ? "border-primary-500 bg-black"
                  : "border-gray-500 bg-white text-black"
              }`}
            >
              {size}
            </Button>
          ))}
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
          <Button
            onClick={onAddToCart}
            className="flex items-center gap-x-2"
            disabled={!selectedColor || !selectedSize}
          >
            Add To Cart
            <ShoppingCart size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Info;
