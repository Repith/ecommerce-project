"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Order, OrderItem } from "@prisma/client";
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

  const title = initialData ? "Edit order" : "Create order";
  const description = initialData ? "Edit order" : "Add a new order";
  const toastMessage = initialData ? "Order updated." : "Order created.";
  const action = initialData ? "Save changes" : "Create";

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

  return (
    <div>
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

      <h3>Order Details</h3>
      <div>
        <strong>Phone:</strong> {initialData.phone}
      </div>
      <div>
        <strong>Address:</strong> {initialData.address}
      </div>
      <div>
        <strong>Is Paid:</strong> {initialData.isPaid ? "Yes" : "No"}
      </div>
    </div>
  );
};
