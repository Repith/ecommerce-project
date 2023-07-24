"use client";

import React, { useState } from "react";
import NextImage from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Image } from "@/types";
import { cn } from "@/lib/utils";

import Button from "@/components/ui/button";

interface GalleryProps {
  images: Image[];
  additionalClass?: string;
}

const Gallery: React.FC<GalleryProps> = ({ images = [], additionalClass }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="flex gap-x-4">
      <div className="flex-col items-center justify-between hidden w-1/4 h-full sm:flex">
        {images.map((image, index) => (
          <div
            key={image.id}
            className={cn(
              `relative w-full h-28 mb-4 overflow-hidden cursor-pointer ${
                index === currentIndex ? "ring-2 ring-slate-500" : ""
              }`,
              additionalClass
            )}
            onClick={() => setCurrentIndex(index)}
          >
            <NextImage
              src={image.url}
              alt="Thumbnail"
              layout="fill"
              objectFit="cover"
            />
          </div>
        ))}
      </div>

      <div className="relative w-full max-h-fit aspect-[1/1.3]">
        <div className="absolute inset-0">
          <Button
            onClick={prevImage}
            className={cn(
              "absolute z-10 p-2 transform -translate-y-1/2 opacity-30 top-1/2 left-2 bg-slate-100"
            )}
          >
            <ChevronLeft color="#737475" className="w-4 h-4" />
          </Button>
          {images.map((image, index) => (
            <div
              key={image.id}
              className="absolute inset-0 overflow-hidden"
              style={{ display: index === currentIndex ? "block" : "none" }}
            >
              <NextImage
                src={image.url}
                alt="Image"
                layout="fill"
                objectFit="cover"
              />
            </div>
          ))}
          <Button
            onClick={nextImage}
            className="absolute z-10 p-2 transform -translate-y-1/2 opacity-30 top-1/2 right-2 bg-slate-100 "
          >
            <ChevronRight color="#737475" className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
