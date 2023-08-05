"use client";

import usePreviewModal from "@/hooks/use-preview-modal";
import Gallery from "@/components/gallery";
import Info from "@/components/info";
import Modal from "@/components/ui/modal";

const PreviewModal = () => {
  const previewModal = usePreviewModal();
  const product = usePreviewModal((state) => state.data);

  if (!product) {
    return null;
  }

  return (
    <Modal open={previewModal.isOpen} onClose={previewModal.onClose}>
      <section className="grid items-start w-full grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
        <figure className="sm:col-span-4 lg:col-span-5">
          <Gallery images={product.images} additionalClass="h-16" />
        </figure>
        <summary className="sm:col-span-8 lg:col-span-7">
          <Info data={product} />
        </summary>
      </section>
    </Modal>
  );
};

export default PreviewModal;
