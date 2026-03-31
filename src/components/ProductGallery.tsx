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
      {/* Main image */}
      <div className="relative aspect-[4/3] bg-gray-50/50 rounded-2xl overflow-hidden border border-gray-100">
        {active && (
          <Image
            src={active.url}
            alt={active.alt || active.filename}
            fill
            className="object-contain p-8"
            sizes="(max-width: 1024px) 100vw, 55vw"
            priority
          />
        )}
      </div>

      {/* Horizontal thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`relative w-[72px] h-[72px] flex-shrink-0 rounded-xl border-2 overflow-hidden bg-gray-50 transition-all ${
                i === activeIndex
                  ? 'border-accent ring-1 ring-accent/20'
                  : 'border-gray-100 hover:border-gray-300'
              }`}
            >
              <Image
                src={img.url}
                alt={img.alt || img.filename}
                fill
                className="object-contain p-1"
                sizes="72px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
