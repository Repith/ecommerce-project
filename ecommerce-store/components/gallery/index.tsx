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
  const [isHovered, setIsHovered] = useState(false);

  const nextImage = () => {
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="flex gap-x-4">
      <div className="flex-col items-center justify-between hidden w-1/6 h-full sm:flex">
        {images.map((image, index) => (
          <div
            key={image.id}
            className={cn(
              `relative w-full h-24 mb-2 overflow-hidden cursor-pointer ${
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

      <div
        className="relative w-full max-h-fit aspect-[1/1.3]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="absolute inset-0">
          <div
            onClick={prevImage}
            className={cn(
              "absolute z-10 inset-y-0 left-0 w-1/6 cursor-pointer",
              isHovered
                ? "bg-gradient-to-r from-zinc-100 opacity-30"
                : "bg-gradient-to-r from-zinc-100 opacity-0"
            )}
          >
            <ChevronLeft className="absolute w-6 h-6 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" />
          </div>
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
          <div
            onClick={nextImage}
            className={cn(
              "absolute z-10 inset-y-0 right-0 w-1/6 cursor-pointer transition-all",
              isHovered
                ? "bg-gradient-to-l from-zinc-100 opacity-30"
                : "bg-gradient-to-l from-zinc-100 opacity-0"
            )}
          >
            <ChevronRight className="absolute w-6 h-6 transform -translate-y-1/2 top-1/2 right-1/2" />
          </div>
          <div className="absolute inset-x-0 z-10 flex items-center justify-center space-x-2 bottom-4">
            {images.map((_, index) => (
              <div
                key={index}
                className={cn(
                  "w-2 h-2 rounded-full ",
                  index === currentIndex
                    ? "bg-accent w-3 h-3 shadow-md"
                    : "bg-slate-100"
                )}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="hidden w-1/6 md:flex"></div>
    </div>
  );
};

export default Gallery;
