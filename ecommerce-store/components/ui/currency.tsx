"use client";

import { MountedCheck } from "@/lib/mounted-check";
import { formatter } from "@/lib/utils";

interface CurrencyProps {
  value?: string | number;
}

const Currency: React.FC<CurrencyProps> = ({ value }) => {
  return (
    <MountedCheck>
      <span className="font-semibold">{formatter.format(Number(value))}</span>
    </MountedCheck>
  );
};

export default Currency;
