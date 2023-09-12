import { format } from "date-fns";

import prismadb from "@/lib/prismadb";

import { ColorsClient } from "./components/client";
import { ColorColumn } from "./components/columns";

const ColorsPage = async ({
  params,
}: {
  params: { storeId: string };
}) => {
  const colors = await prismadb.color.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedColors: ColorColumn[] = colors.map(
    (item) => ({
      id: item.id,
      name: item.name,
      value: item.value,
      createdAt: format(item.createdAt, "MMMM do, yyyy"),
    })
  );

  return (
    <main className="flex-col md:ml-56">
      <section className="flex-1 p-8 pt-6 space-y-4">
        <ColorsClient data={formattedColors} />
      </section>
    </main>
  );
};

export default ColorsPage;
