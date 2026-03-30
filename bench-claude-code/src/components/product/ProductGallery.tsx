'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import type { ProductImage } from '@/types/product'

interface ProductGalleryProps {
  images: ProductImage[]
  productName: string
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  if (images.length === 0) {
    return (
      <div className="aspect-square bg-muted rounded-lg flex items-center justify-center text-muted-foreground">
        Нет изображений
      </div>
    )
  }

  const activeImage = images[activeIndex]

  return (
    <div className="flex flex-col gap-4">
      {/* Main image */}
      <div className="relative aspect-[4/3] bg-gradient-to-b from-slate-50 to-slate-100/50 rounded-xl overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={activeImage.url}
          alt={activeImage.alt || productName}
          className="absolute inset-0 w-full h-full object-contain p-6 sm:p-10 transition-opacity duration-300"
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 justify-center">
          {images.map((image, index) => (
            <button
              key={image.filename}
              onClick={() => setActiveIndex(index)}
              className={cn(
                'relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden bg-slate-50 transition-all duration-200',
                index === activeIndex
                  ? 'ring-2 ring-foreground ring-offset-2'
                  : 'ring-1 ring-border hover:ring-foreground/30',
              )}
              aria-label={`Показать изображение ${index + 1}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image.url}
                alt={image.alt || `${productName} — ракурс ${index + 1}`}
                className="w-full h-full object-contain p-1.5"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
