"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import qs from "query-string";

import Button from "@/components/ui/button";

const SearchBar: React.FC = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const onSearch = () => {
    if (query.length < 3) return;

    const url = qs.stringifyUrl(
      {
        url: "/search",
        query: { q: query },
      },
      { skipNull: true }
    );

    router.push(url);
  };

  return (
    <div className="mb-8">
      <input
        type="text"
        className="p-2 text-sm text-gray-800 bg-white border border-gray-300 rounded-md"
        placeholder="Search for products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button className="ml-2" onClick={onSearch}>
        Search
      </Button>
    </div>
  );
};

export default SearchBar;
