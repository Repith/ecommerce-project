import getBillboard from "@/actions/get-billboard";
import getProducts from "@/actions/get-products";
import Billboard from "@/components/billboard";
import ProductList from "@/components/product-list";
import Container from "@/components/ui/container";

export const revalidate = 0;

const HomePage = async () => {
  const products = await getProducts({ isFeatured: true });
  const billboard = await getBillboard(
    "1cde391e-7ac3-46f3-8af6-2db1f9b56d3d"
  );

  return (
    <div>
      <div className="m-0 space-y-10">
        <Billboard
          data={billboard}
          rounded=""
          additionalProps="transition aspect-[3.3/1] p-0 rounded-none"
        />
      </div>
      <Container>
        <div className="flex flex-col px-8 pb-8 gap-y-8 sm:px-6 lg:px-8">
          <ProductList
            title="Featured Products"
            items={products}
          />
        </div>
      </Container>
    </div>
  );
};

export default HomePage;
