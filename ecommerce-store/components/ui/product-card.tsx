"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MouseEventHandler } from "react";
import { Expand, ShoppingCart } from "lucide-react";

import { Product } from "@/types";
import useCart from "@/hooks/use-cart";
import Currency from "@/components/ui/currency";
import IconButton from "@/components/ui/icon-button";
import usePreviewModal from "@/hooks/use-preview-modal";

interface ProductCardProps {
  data: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  const [loading, setLoading] = useState(true);
  const previewModal = usePreviewModal();
  const router = useRouter();
  const cart = useCart();

  // Symulacja opóźnienia ładowania.
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Opóźnienie 2 sekundy

    // Wyczyszczenie timera po unmountingu.
    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    router.push(`/product/${data?.id}`);
  };

  const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();

    previewModal.onOpen(data);
  };

  if (loading) {
    // Skeleton/loading state
    return (
      <div className="animate-pulse">
        <div className="h-32 bg-gray-200"></div>
        <div className="h-4 mt-2 bg-gray-200"></div>
        <div className="h-4 mt-1 bg-gray-200"></div>
        <div className="h-4 mt-1 bg-gray-200"></div>
      </div>
    );
  }

  // Normal state
  return (
    <div
      onClick={handleClick}
      className="p-3 space-y-4 bg-white border cursor-pointer group rounded-xl"
    >
      {/* Images and Actions */}
      <div className="relative bg-gray-100 aspect-square rounded-xl">
        <Image
          alt="Image"
          src={data?.images?.[0]?.url}
          fill
          className="object-cover rounded-md aspect-square"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute w-full px-6 transition opacity-0 group-hover:opacity-100 bottom-5">
          <div className="flex justify-center gap-x-6">
            <IconButton
              onClick={onPreview}
              icon={<Expand size={20} className="text-gray-600" />}
            />
          </div>
        </div>
      </div>
      {/* Description */}
      <div>
        <p className="text-lg font-semibold">{data.name}</p>
        <p className="text-sm text-gray-500">{data.category?.name}</p>
      </div>
      {/* Price */}
      <div className="flex items-center justify-between">
        <Currency value={data?.price} />
      </div>
    </div>
  );
};

export default ProductCard;
