import { format } from "date-fns";

import prismadb from "@/lib/prismadb";
import { formatter } from "@/lib/utils";

import { OrderColumn } from "./components/columns";
import { OrderClient } from "./components/client";

const OrdersPage = async ({
  params,
}: {
  params: { storeId: string };
}) => {
  const orders = await prismadb.order.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      orderItems: {
        include: {
          product: true,
          variant: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedOrders: OrderColumn[] = orders.map(
    (item) => ({
      id: item.id,
      phone: item.phone,
      address: item.address,
      products: JSON.stringify(
        item.orderItems.map(
          (orderItem) => orderItem.product.name
        )
      ),
      variants: JSON.stringify(
        item.orderItems.map(
          (orderItem) =>
            `${orderItem.variant?.colorId} - ${orderItem.variant?.sizeId}`
        )
      ),
      quantity: JSON.stringify(
        item.orderItems.map(
          (orderItem) => `${orderItem.quantity}`
        )
      ),
      totalPrice: formatter.format(
        item.orderItems.reduce((total, item) => {
          return total + Number(item.product.price);
        }, 0)
      ),
      isPaid: item.isPaid,
      isSent: item.isSent,
      createdAt: format(item.createdAt, "MMMM do, yyyy"),
    })
  );

  return (
    <main className="flex-col md:ml-56">
      <section className="flex-1 p-8 pt-6 space-y-4">
        <OrderClient data={formattedOrders} />
      </section>
    </main>
  );
};

export default OrdersPage;
