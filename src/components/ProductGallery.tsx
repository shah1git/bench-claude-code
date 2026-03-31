'use client'

import { useState } from 'react'
import Image from 'next/image'

type GalleryImage = {
  url: string
  filename: string
  alt?: string | null
}

export function ProductGallery({ images }: { images: GalleryImage[] }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = images[activeIndex]

  return (
    <div className="space-y-3">
      <div className="relative aspect-square bg-gray-50 rounded-xl overflow-hidden border border-gray-100">
        {active && (
          <Image
            src={active.url}
            alt={active.alt || active.filename}
            fill
            className="object-contain p-6"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        )}
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 rounded-lg border-2 overflow-hidden bg-gray-50 transition-all ${
              i === activeIndex
                ? 'border-accent ring-1 ring-accent/30'
                : 'border-gray-100 hover:border-gray-300'
            }`}
          >
            <Image
              src={img.url}
              alt={img.alt || img.filename}
              fill
              className="object-contain p-1"
              sizes="80px"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
