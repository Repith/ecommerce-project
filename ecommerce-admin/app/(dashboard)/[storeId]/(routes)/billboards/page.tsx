import { format } from "date-fns";

import prismadb from "@/lib/prismadb";

import { BillboardsClient } from "./components/client";
import { BillboardColumn } from "./components/columns";

const BillboardsPage = async ({
  params,
}: {
  params: { storeId: string };
}) => {
  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedBillboards: BillboardColumn[] =
    billboards.map((item) => ({
      id: item.id,
      label: item.label,
      createdAt: format(item.createdAt, "MMMM do, yyyy"),
    }));

  return (
    <main className="flex-col md:ml-56">
      <section className="flex-1 p-8 pt-6 space-y-4">
        <BillboardsClient data={formattedBillboards} />
      </section>
    </main>
  );
};

export default BillboardsPage;
