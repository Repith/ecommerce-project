"use client";

import React from "react";
import useSWR from "swr";
import { useSearchParams } from "next/navigation";

import { Product } from "@/types";
import getProducts from "@/actions/get-products";

import SearchBar from "@/components/ui/search-input";
import ProductCard from "@/components/ui/product-card";
import NoResults from "@/components/ui/no-results";
import Container from "@/components/ui/container";
import { Loader } from "@/components/ui/loader";

const SearchPage = () => {
  const search = useSearchParams();
  const searchQuery = search ? search.get("q") : null;

  const { data, error } = useSWR(
    () => [
      `/api/${process.env.NEXT_PUBLIC_API_URL}/products`,
      {
        name:
          searchQuery && searchQuery.length >= 3 ? encodeURI(searchQuery) : "",
      },
    ],
    (urlWithParams) => getProducts(urlWithParams[1]),
    {
      revalidateOnFocus: false,
    }
  );

  if (error) {
    return (
      <div className="py-20 m-auto w-fit">
        Failed to load searchbar. Try refreshing the page.
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center w-full h-full py-20">
        <Loader />
      </div>
    );
  }

  return (
    <Container>
      <div className="flex flex-col items-center justify-center py-16">
        {/* Warning */}
        {searchQuery && searchQuery.length < 3 && (
          <div
            className={
              searchQuery && searchQuery.length < 3
                ? "flex transition-all justify-center  py-4 px-52 rounded-sm mb-10 font-medium text-md text-yellow-500 bg-yellow-100 shadow-md shadow-zinc-100"
                : "hidden"
            }
          >
            <span>Atleast 3 characters are needed for a search</span>
          </div>
        )}
        {/* Search bar */}
        <span className="text-xl ">What are you looking for?</span>
        <SearchBar />
      </div>
      <div className="px-4 pb-4 lg:px-6 lg:pb-8 ">
        {/* Products */}
        {!searchQuery && <div className="pb-14"></div>}
        {searchQuery && searchQuery.length >= 3 && (
          <>
            <span className="mt-10 text-xl">
              Showing results for:{" "}
              <span className="font-semibold">{searchQuery}</span>
            </span>

            <div className="mt-6 lg:col-span-5 lg:mt-4">
              {data.length === 0 && <NoResults />}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {data.map((product: Product) => (
                  <ProductCard key={product.id} data={product} />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </Container>
  );
};

export default SearchPage;
