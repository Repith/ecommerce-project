import {
  CreditCard,
  DollarSign,
  Package,
} from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { Overview } from "@/components/overview";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { getTotalRevenue } from "@/actions/get-total-revenue";
import { getSalesCount } from "@/actions/get-sales-count";
import { getGraphRevenue } from "@/actions/get-graph-revenue";
import { getStockCount } from "@/actions/get-stock-count";
import { formatter } from "@/lib/utils";
import { getRecentOrders } from "@/actions/get-recent-orders";
import RecentOrders from "@/components/recent-orders";

interface DashboardPageProps {
  params: {
    storeId: string;
  };
}

const DashboardPage: React.FC<DashboardPageProps> = async ({
  params,
}) => {
  const totalRevenue = await getTotalRevenue(
    params.storeId
  );
  const graphRevenue = await getGraphRevenue(
    params.storeId
  );
  const salesCount = await getSalesCount(params.storeId);
  const stockCount = await getStockCount(params.storeId);
  const recentOrders = await getRecentOrders(
    params.storeId
  );

  return (
    <main className="flex-col md:ml-56">
      <nav className="flex-1 p-8 pt-6 space-y-4">
        <Heading
          title="Dashboard"
          description="Overview of your store"
        />
        <Separator />
        <section className="grid grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <DollarSign className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatter.format(totalRevenue)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                Sales
              </CardTitle>
              <CreditCard className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                +{salesCount}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                Products In Stock
              </CardTitle>
              <Package className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stockCount}
              </div>
            </CardContent>
          </Card>
        </section>
        <section className="flex flex-col lg:flex-row gap-x-4 gap-y-4">
          <Card className="flex-col lg:w-2/6 ">
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <RecentOrders data={recentOrders} />
            </CardContent>
          </Card>
          <Card className="flex-col lg:w-4/6">
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <Overview data={graphRevenue} />
            </CardContent>
          </Card>
        </section>
      </nav>
    </main>
  );
};

export default DashboardPage;
