import { MountedCheck } from "@/lib/mounted-check";
import {
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useState } from "react";

const SearchInput = () => {
  const search = useSearchParams();
  const [searchQuery, setSearchQuery] = useState<
    string | null
  >(search ? search.get("q") : "");
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
        className="flex items-center justify-start w-full max-w-lg py-1 border-b-2 border-accent/50 sm:py-3"
      >
        <input
          value={searchQuery || ""}
          onChange={(event) =>
            setSearchQuery(event.target.value)
          }
          className="flex w-full pl-6 text-sm text-accent placeholder:text-accent/60 focus:outline-none"
          placeholder="Search"
          style={{
            backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23d41d6d'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M10 6h.01M16 9a6 6 0 11-12 0 6 6 0 0112 0z'></path><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M21 21l-6-6'></path></svg>")`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "16px 16px",
            backgroundPosition: "0.15rem center",
          }}
        />
      </form>
    </MountedCheck>
  );
};

export default SearchInput;
