"use client";

import { useEffect, useState } from "react";

import { StoreModal } from "@/components/modals/store-model";

//Until lifecycle has run (client componenent) return null (server client)
//Avoid hydration error
export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <StoreModal />
    </>
  );
};
