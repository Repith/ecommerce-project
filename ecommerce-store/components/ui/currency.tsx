"use client";

import { MountedCheck } from "@/lib/mounted-check";
import { cn, formatter } from "@/lib/utils";

interface CurrencyProps {
  value?: string | number;
  className?: string[];
}

const Currency: React.FC<CurrencyProps> = ({ value, className }) => {
  return (
    <MountedCheck>
      <span className={cn("font-semibold", ...(className || []))}>
        {formatter.format(Number(value))}
      </span>
    </MountedCheck>
  );
};

export default Currency;
