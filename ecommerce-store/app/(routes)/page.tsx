import getBillboard from "@/actions/get-billboard";
import getProducts from "@/actions/get-products";
import Billboard from "@/components/billboard";
import ProductList from "@/components/product-list";
import Container from "@/components/ui/container";

export const revalidate = 0;

const HomePage = async () => {
  const products = await getProducts({ isFeatured: true });
  const billboard = await getBillboard("dbedf70d-59ae-4988-81f5-cd786ce482d4");

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
