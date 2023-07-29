"use client";

import { useEffect, useState } from "react";
import qs from "query-string";
import { useRouter, useSearchParams } from "next/navigation";

import { Product } from "@/types";
import getProducts from "@/actions/get-products";
import ProductCard from "@/components/ui/product-card";

const SearchPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);

  // When the component mounts or searchParams change, fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      const query = searchParams.get("query");

      if (!query || query.length < 3) {
        setProducts([]); // Clear products if query length is less than 3
        return;
      }

      const current = qs.parse(searchParams.toString());

      let values = (current["query"] || "").split(",").filter(Boolean);

      if (!values.includes(query)) {
        values.push(query);
      }

      const queryParams = {
        ...current,
        query: values.join(","),
      };

      if (values.length === 0) {
        queryParams["query"] = null;
      }

      // Get products based on search query
      const fetchedProducts = await getProducts(queryParams);
      setProducts(fetchedProducts);
    };

    fetchProducts();
  }, [searchParams]);

  return (
    <div>
      <h1>Search results for "{searchParams.get("query")}"</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
