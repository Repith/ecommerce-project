import { format } from "date-fns";

import prismadb from "@/lib/prismadb";
import { formatter } from "@/lib/utils";

import { ProductsClient } from "./components/client";
import { ProductColumn } from "./components/columns";

const ProductsPage = async ({
  params,
}: {
  params: { storeId: string };
}) => {
  const products = await prismadb.product.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      category: true,
      variants: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedProducts: ProductColumn[] = products.map(
    (item) => {
      return {
        id: item.id,
        name: item.name,
        isFeatured: item.isFeatured,
        isArchived: item.isArchived,
        price: formatter.format(item.price.toNumber()),
        category: item.category.name,
        variants: item.variants.length,
        inStock: item.variants.reduce(
          (total, variant) => total + variant.inStock,
          0
        ),
        description: item.description,
        createdAt: format(item.createdAt, "MMMM do, yyyy"),
      };
    }
  );

  return (
    <main className="flex-col md:ml-56">
      <section className="flex-1 p-8 pt-6 space-y-4">
        <ProductsClient data={formattedProducts} />
      </section>
    </main>
  );
};

export default ProductsPage;
