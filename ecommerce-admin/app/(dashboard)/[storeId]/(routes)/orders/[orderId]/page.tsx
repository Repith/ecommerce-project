import prismadb from "@/lib/prismadb";
import { OrderForm } from "./components/order-form";

const OrderPage = async ({ params }: { params: { orderId: string } }) => {
  const order = await prismadb.order.findUnique({
    where: {
      id: params.orderId,
    },
    include: {
      orderItems: true,
    },
  });

  return (
    <div className="flex-col ml-56">
      <div className="flex-1 p-8 pt-6 space-y-4">
        <OrderForm initialData={order} />
      </div>
    </div>
  );
};

export default OrderPage;
