import { Product } from "@/types";
import NoResults from "@/components/ui/no-results";
import ProductCard from "./ui/product-card";
import ColorEffect from "./ui/color-effect";

interface ProductListProps {
  title: string;
  items: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ title, items }) => {
  return (
    <section className="pt-8 spac-y-4">
      <h3 className="py-2 text-3xl font-bold">
        <ColorEffect>{title}</ColorEffect>
      </h3>
      {items.length === 0 && <NoResults />}
      <figure className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {items.map((item) => (
          <ProductCard key={item.id} data={item} />
        ))}
      </figure>
    </section>
  );
};

export default ProductList;
