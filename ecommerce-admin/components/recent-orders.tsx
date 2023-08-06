import { Order } from "@prisma/client";
import Link from "next/link";
import { Badge } from "./ui/badge";

interface RecentOrderProps {
  data: Order[];
}

const RecentOrders: React.FC<RecentOrderProps> = ({ data }) => {
  return (
    <div>
      {data.map((order, index) => (
        <div key={index} className="p-2">
          <Link href={`/${order.storeId}/orders/${order.id}`}>
            <div className="flex justify-between p-2 border-2">
              {order.orderItems.map((item, itemIndex) => (
                <span key={itemIndex}>{item.product.name}, </span>
              ))}
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
          </Link>
        </div>
      ))}
    </div>
  );
};

export default RecentOrders;
