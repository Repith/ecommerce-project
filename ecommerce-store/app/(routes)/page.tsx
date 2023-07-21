import getBillboard from "@/actions/get-billboard";
import getProducts from "@/actions/get-products";
import Billboard from "@/components/billboard";
import ProductList from "@/components/product-list";
import Container from "@/components/ui/container";

export const revalidate = 0;

const HomePage = async () => {
  const products = await getProducts({ isFeatured: true });
  const billboard = await getBillboard("8b60052a-a5d6-40cb-aa9c-e6b12fb70317");

  return (
    <Container>
      <div className="pb-10 space-y-10">
        <Billboard data={billboard} />
      </div>

      <div className="flex flex-col px-4 gap-y-8 sm:px-6 lg:px-8">
        <ProductList title="Featured Products" items={products} />
      </div>
    </Container>
  );
};

export default HomePage;
