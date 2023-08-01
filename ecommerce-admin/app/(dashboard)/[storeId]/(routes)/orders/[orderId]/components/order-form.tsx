"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Order, OrderItem, Product } from "@prisma/client";
import { Trash } from "lucide-react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { AlertModal } from "@/components/modals/alert-modal";
import { Form, FormControl, FormItem, FormLabel } from "@/components/ui/form";

const orderItemSchema = z.object({
  productId: z.string().min(1).nullable(),
  quantity: z.coerce.number().min(1),
  variant: z.string().min(1).nullable(),
});

const formSchema = z.object({
  phone: z.string().min(1),
  address: z.string().min(1),
  isPaid: z.boolean().default(false).optional(),
  orderItems: z.array(orderItemSchema),
});

type OrderFormValues = z.infer<typeof formSchema>;

interface OrderFormProps {
  initialData: Order & { orderItems: OrderItem[] };
}

export const OrderForm: React.FC<OrderFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData && "Order details";
  const description = initialData && "More information about specific order";
  const toastMessage = initialData ? "Order updated." : "Order created.";

  const form = useForm<OrderFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "orderItems",
  });

  const onSubmit = async (data: OrderFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/orders/${params.orderId}`,
          data
        );
      }
      router.refresh();
      router.push(`/${params.storeId}/orders`);
      toast.success(toastMessage);
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/orders/${params.orderId}`);
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

  //TODO: - function that fetch data for a dedicated product and variant
  // const URL = `http://localhost:3000/api/${initialData.storeId}/products`;

  // const getProduct = async (id: string): Promise<Product> => {
  //   const res = await fetch(`${URL}/${id}`);

  //   return res.json();
  // };

  return (
    <div className="container px-4 mx-auto">
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description}></Heading>
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

      <h3 className="pt-4 text-xl font-bold">Order ID: {initialData.id}</h3>
      <div className="p-2 mb-4 overflow-hidden shadow sm:rounded-lg">
        <div className="mb-2">
          <strong className="text-gray-700">Phone:</strong> {initialData.phone}
        </div>
        <div className="mb-2">
          <strong className="text-gray-700">Address:</strong>{" "}
          {initialData.address}
        </div>
        <div className="mb-2">
          <strong className="text-gray-700">Is Paid:</strong>{" "}
          {initialData.isPaid ? "Yes" : "No"}
        </div>
        <div>
          <strong className="text-gray-700">Variants:</strong>
          <div className="pl-6">
            <>
              {initialData.orderItems.map((variant, i) => (
                <>
                  <div key={i} className="mb-1">
                    {variant.variantId} x {variant.quantity}
                  </div>
                </>
              ))}
            </>
          </div>
        </div>
      </div>
    </div>
  );
};
