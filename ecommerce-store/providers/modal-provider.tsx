"use client";

import PreviewModal from "@/components/preview-modal";
import { MountedCheck } from "@/lib/mounted-check";

const ModalProvider = () => {
  return (
    <>
      <MountedCheck>
        <PreviewModal />
      </MountedCheck>
    </>
  );
};

export default ModalProvider;
