import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";
import { ReactNode, useEffect, useState } from "react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface MountedCheckProps {
  children: ReactNode;
}

const MountedCheck: React.FC<MountedCheckProps> = ({ children }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return children;
};

export default MountedCheck;
