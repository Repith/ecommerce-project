import { format } from "date-fns";

import prismadb from "@/lib/prismadb";

import { CategoriesClient } from "./components/client";
import { CategoryColumn } from "./components/columns";

const CategoriesPage = async ({
  params,
}: {
  params: { storeId: string };
}) => {
  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      billboard: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedCategories: CategoryColumn[] =
    categories.map((item) => ({
      id: item.id,
      name: item.name,
      billboardLabel: item.billboard.label,
      createdAt: format(item.createdAt, "MMMM do, yyyy"),
    }));

  return (
    <main className="flex-col md:ml-56">
      <section className="flex-1 p-8 pt-6 space-y-4">
        <CategoriesClient data={formattedCategories} />
      </section>
    </main>
  );
};

export default CategoriesPage;
