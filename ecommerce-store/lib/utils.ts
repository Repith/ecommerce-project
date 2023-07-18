import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));

}

// export const formatter = new Intl.NumberFormat("pl", {
//   style: "currency",
//   currency: "PLN",
// });

export const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});