import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

import { Order, OrderItem, Product } from "@prisma/client";

import { Badge } from "@/components/ui/badge";

interface RecentOrderProps {
  data: (Order & {
    orderItems: (OrderItem & {
      product: Product;
    })[];
  })[];
}

const RecentOrders: React.FC<RecentOrderProps> = ({
  data,
}) => {
  return (
    <div>
      {data.map((order, index) => (
        <div key={index} className="p-2 text-sm">
          <Link
            href={`/${order.storeId}/orders/${order.id}`}
          >
            <div className="flex flex-row items-center p-4 border-2 rounded-md justify-evenly ">
              <div className="flex flex-col">
                {order.orderItems.map((item, itemIndex) => (
                  <div key={itemIndex}>
                    {`${item.product.name} x ${item.quantity} `}
                  </div>
                ))}
              </div>
              <div className="flex ml-auto">
                {formatDistanceToNow(
                  new Date(order.createdAt)
                )}{" "}
                ago
              </div>
              <div className="flex ml-auto">
                {order.isPaid ? (
                  order.isSent ? (
                    <Badge variant="success">Sent</Badge>
                  ) : (
                    <Badge variant="warning">Pending</Badge>
                  )
                ) : (
                  <Badge variant="destructive">
                    Processing
                  </Badge>
                )}
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default RecentOrders;
