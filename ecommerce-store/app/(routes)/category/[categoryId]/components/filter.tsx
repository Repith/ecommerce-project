"use client";

import qs from "query-string";
import { useRouter, useSearchParams } from "next/navigation";

import Button from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Color, Size } from "@/types";
import ColorEffect from "@/components/ui/color-effect";

interface FilterProps {
  data: (Size | Color)[];
  name: string;
  valueKey: string;
}

const Filter: React.FC<FilterProps> = ({ data, name, valueKey }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const selectedValues = searchParams.get(valueKey)?.split(",") || [];

  const onClick = (name: string) => {
    const current = qs.parse(searchParams.toString());

    let values = (current[valueKey] || "").split(",").filter(Boolean);

    if (values.includes(name)) {
      values = values.filter((value) => value !== name);
    } else {
      values.push(name);
    }

    const query = {
      ...current,
      [valueKey]: values.join(","),
    };

    if (values.length === 0) {
      query[valueKey] = null;
    }

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipNull: true }
    );

    router.push(url);
  };

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold">
        <ColorEffect>{name}</ColorEffect>
      </h3>
      <hr className="my-4" />
      <div className="flex flex-wrap gap-2 ">
        {data.map((filter) => (
          <div key={filter.name} className="flex items-center">
            <Button
              className={cn(
                "rounded-md text-sm text-gray-800 p-2 bg-white border border-gray-300",
                selectedValues.includes(filter.name) && "bg-accent text-white"
              )}
              onClick={() => onClick(filter.name)}
            >
              {filter.name}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter;
