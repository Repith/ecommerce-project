"use client";

import { MountedCheck } from "@/lib/mounted-check";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const SearchInput = () => {
  const search = useSearchParams();
  const [searchQuery, setSearchQuery] = useState<string | null>(
    search ? search.get("q") : ""
  );
  const router = useRouter();

  const onSearch = (event: React.FormEvent) => {
    event.preventDefault();

    if (typeof searchQuery !== "string") {
      return;
    }

    const encodedSearchQuery = encodeURI(searchQuery);
    router.push(`/search?q=${encodedSearchQuery}`);
  };

  return (
    <MountedCheck>
      <form
        onSubmit={onSearch}
        className="flex items-center justify-start w-full max-w-md border-b-2 sm:py-3"
      >
        <div>
          <Search size={16} className="pr-1 text-zinc-900" onClick={onSearch} />
        </div>
        <div aria-label="Search bar">
          <input
            value={searchQuery || ""}
            onChange={(event) => setSearchQuery(event.target.value)}
            className="flex w-full text-sm text-zinc-500 placeholder:text-zinc-300 focus:outline-none"
            placeholder="Search"
          />
        </div>
      </form>
    </MountedCheck>
  );
};

export default SearchInput;
