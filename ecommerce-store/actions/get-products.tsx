import qs from "query-string";

import { Product } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

interface Query {
  name?: string;
  categoryId?: string;
  colorId?: string;
  sizeId?: string;
  isFeatured?: boolean;
}

const getProducts = async (query: Query): Promise<Product[]> => {
  if (!query || Object.keys(query).length === 0) {
    return [];
  }

  const url = qs.stringifyUrl({
    url: URL,
    query: {
      name: query.name,
      colorId: query.colorId,
      sizeId: query.sizeId,
      categoryId: query.categoryId,
      isFeatured: query.isFeatured,
    },
  });

  const res = await fetch(url);

  return res.json();
};

export default getProducts;
