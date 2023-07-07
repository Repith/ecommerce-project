"use client";

import { title } from "process";
import { Modal } from "@/components/ui/modal";
import { useStoreModal } from "@/hooks/use-store-model";

export const StoreModal = () => {
  const storeModal = useStoreModal();
  return (
    <Modal
      title="Create store"
      description="Add a new store to manage products and categories"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      Future Create Store Form
    </Modal>
  );
};
