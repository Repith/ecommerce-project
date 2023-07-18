"use client";

import { StoreModal } from "@/components/modals/store-modal";
import { MountedCheck } from "@/lib/mounted-check";

//Until lifecycle has run (client componenent) return null (server client)
//Avoid hydration error
export const ModalProvider = () => {
  return (
    <>
      <MountedCheck>
        <StoreModal />
      </MountedCheck>
    </>
  );
};
