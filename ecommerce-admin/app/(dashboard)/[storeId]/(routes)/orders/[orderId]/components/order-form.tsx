"use client";

import axios from "axios";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Send, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { AlertModal } from "@/components/modals/alert-modal";
import { OrderColumn } from "../../components/columns";

type Products = {
  variants: string[];
  quantity: string[];
};

export const OrderForm: React.FC<{
  initialData: OrderColumn;
}> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const variants = JSON.parse(
    initialData.variants
  ) as string[];
  const quantity = JSON.parse(
    initialData.quantity
  ) as string[];

  const products: Products[] = [
    {
      variants,
      quantity,
    },
  ];

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(
        `/api/${params.storeId}/orders/${initialData.id}`
      );
      router.refresh();
      router.push(`/${params.storeId}/orders`);
      toast.success("Order deleted.");
    } catch (error) {
      toast.error("Something went wrong with this order.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const onSent = async () => {
    if (!initialData.isSent) {
      try {
        setLoading(true);
        await axios.patch(
          `/api/${params.storeId}/orders/${initialData.id}`,
          {
            ...initialData,
            isSent: true,
          }
        );
        router.refresh();
        toast.success("Order is sent");
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("Order is already sent");
    }
  };

  return (
    <div className="container px-4 mx-auto">
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading
          title="Order details"
          description={
            "More information about specific order"
          }
        />
        {initialData && (
          <Button
            variant="destructive"
            size="icon"
            onClick={() => setOpen(true)}
            disabled={loading}
          >
            <Trash className="w-4 h-4" />
          </Button>
        )}
      </div>
      <Separator />
      <h3 className="pt-4 text-xl font-bold">
        Order ID: {initialData.id}
      </h3>
      <div className="p-2 mb-4 overflow-hidden shadow sm:rounded-lg">
        <div className="mb-2">
          <strong className="text-gray-700">Phone:</strong>{" "}
          {initialData.phone}
        </div>
        <div className="mb-2">
          <strong className="text-gray-700">
            Address:
          </strong>{" "}
          {initialData.address}
        </div>
        <div className="mb-2">
          <strong className="text-gray-700">
            Is Paid:
          </strong>{" "}
          {initialData.isPaid ? "Yes" : "No"}
        </div>
        <div>
          <strong className="text-gray-700">
            Variants:
          </strong>
          <div className="flex flex-col justify-center">
            {variants.map((variant, i) => (
              <div key={i} className="mb-1">
                {variant} x {quantity[i]}
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-between mb-2">
          <div>
            <strong className="text-gray-700">
              Is Sent:
            </strong>{" "}
            {initialData.isSent ? "Yes" : "No"}
          </div>
          <Button onClick={onSent} className="py-1">
            Mark as sent <Send className="pl-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};
