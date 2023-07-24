import getBillboard from "@/actions/get-billboard";
import getProducts from "@/actions/get-products";
import Billboard from "@/components/billboard";
import ProductList from "@/components/product-list";
import Container from "@/components/ui/container";

export const revalidate = 0;

const HomePage = async () => {
  const products = await getProducts({ isFeatured: true });
  const billboard = await getBillboard("93b99142-31cf-470f-b83f-20fd3a76e946");

  return (
    <Container>
      <div className="pb-4 space-y-10">
        <Billboard data={billboard} additionalProps="transition aspect-[3/1]" />
      </div>

      <div className="flex flex-col px-8 gap-y-8 sm:px-6 lg:px-8">
        <ProductList title="Featured Products" items={products} />
      </div>
    </Container>
  );
};

export default HomePage;
