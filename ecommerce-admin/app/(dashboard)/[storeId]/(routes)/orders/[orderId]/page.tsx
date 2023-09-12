import prismadb from "@/lib/prismadb";
import { OrderForm } from "./components/order-form";
import { OrderColumn } from "../components/columns";
import { formatter } from "@/lib/utils";
import { format } from "date-fns";

const OrderPage = async ({
  params,
}: {
  params: { orderId: string };
}) => {
  const order = await prismadb.order.findUnique({
    where: {
      id: params.orderId,
    },
    include: {
      orderItems: {
        include: {
          product: true,
          variant: true,
        },
      },
    },
  });

  if (!order) {
    return <div>Order not found</div>;
  }

  const formattedOrder: OrderColumn = {
    id: order.id,
    phone: order.phone,
    address: order.address,
    products: JSON.stringify(
      order.orderItems.map(
        (orderItem) => orderItem.product.name
      )
    ),
    variants: JSON.stringify(
      order.orderItems.map(
        (orderItem) =>
          `${orderItem.variant?.colorId} - ${orderItem.variant?.sizeId}`
      )
    ),
    quantity: JSON.stringify(
      order.orderItems.map(
        (orderItem) => `${orderItem.quantity}`
      )
    ),
    totalPrice: formatter.format(
      order.orderItems.reduce((total, item) => {
        return total + Number(item.product.price);
      }, 0)
    ),
    isPaid: order.isPaid,
    isSent: order.isSent,
    createdAt: format(order.createdAt, "MMMM do, yyyy"),
  };

  return (
    <div className="flex-col md:ml-56">
      <div className="flex-1 p-8 pt-6 space-y-4">
        <OrderForm initialData={formattedOrder} />
      </div>
    </div>
  );
};

export default OrderPage;
