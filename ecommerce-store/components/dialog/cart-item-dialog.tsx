import Image from "next/image";

import { Trash2 } from "lucide-react";

import IconButton from "@/components/ui/icon-button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import { CartItem } from "@/types";

interface CartItemProps {
  data: CartItem;
}

const CartItemDialog: React.FC<CartItemProps> = ({ data }) => {
  const cart = useCart();

  const onRemove = () => {
    cart.removeItem(data.product.id, data.variant.id);
  };

  return (
    <li className="flex items-center py-4 border-b">
      <div className="relative w-20 h-20 overflow-hidden rounded-md">
        <Image
          fill
          src={data.product.images[0]!.url}
          alt=""
          className="object-cover object-center"
        />
      </div>
      <div className="relative flex flex-col justify-between flex-1 ml-4 ">
        <div className="absolute right-0 z-10 top-6">
          <IconButton onClick={onRemove} icon={<Trash2 size={15} />} />
        </div>
        <div className="relative pr-9 ">
          <div className="flex justify-between">
            <p className="text-lg font-semibold text-black ">
              {data.product.name}
            </p>
          </div>

          <div className="flex mt-1 text-sm">
            <p className="text-gray-500">Color</p>
            <p className="font-semibold">&nbsp;{data.variant.colorId}</p>
            <p className="pl-4 ml-4 text-gray-500 border-l border-gray-200">
              Size:
            </p>
            <p className="font-semibold">&nbsp;{data.variant.sizeId}</p>
          </div>
          <div className="flex mb-2 text-sm">
            <p className="text-gray-500">Quantity</p>
            <p className="font-semibold">&nbsp;{data.quantity}</p>
          </div>
          <Currency value={data.product.price * data.quantity} />
        </div>
      </div>
    </li>
  );
};

export default CartItemDialog;
