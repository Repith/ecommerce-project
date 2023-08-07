import { Order, OrderItem } from "@prisma/client";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { formatDistanceToNow } from "date-fns";

interface RecentOrderProps {
  data: Order[] | { orderItems: OrderItem[] };
}

const RecentOrders: React.FC<RecentOrderProps> = ({ data }) => {
  return (
    <div>
      {data.map((order, index) => (
        <div key={index} className="p-2">
          <Link href={`/${order.storeId}/orders/${order.id}`}>
            <div className="grid p-2 border-2 grid-col-3">
              <div className="col-span-1">
                {order.orderItems.map((item, itemIndex) => (
                  <div key={itemIndex}>
                    {`${item.product.name} x ${item.quantity} `}
                  </div>
                ))}
              </div>
              <div className="col-span-2">
                {formatDistanceToNow(new Date(order.createdAt))} ago
              </div>
              <div className="col-span-3">
                {order.isPaid ? (
                  order.isSent ? (
                    <Badge variant="success">Sent</Badge>
                  ) : (
                    <Badge variant="warning">Pending</Badge>
                  )
                ) : (
                  <Badge variant="destructive">Processing</Badge>
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
