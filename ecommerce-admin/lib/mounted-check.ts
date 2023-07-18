import { ReactNode, useEffect, useState } from "react";

interface MountedCheckProps {
    children: ReactNode;
  }
  
  export const MountedCheck: React.FC<MountedCheckProps> = ({ children }) => {
    const [isMounted, setIsMounted] = useState(false);
  
    useEffect(() => {
      setIsMounted(true);
    }, []);
  
    if (!isMounted) {
      return null;
    }
  
    return children;
  };