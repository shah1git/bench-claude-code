'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

type GalleryImage = {
  url: string
  filename: string
  alt?: string | null
}

export function ProductGallery({ images }: { images: GalleryImage[] }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = images[activeIndex]

  const prev = () => setActiveIndex((i) => (i > 0 ? i - 1 : images.length - 1))
  const next = () => setActiveIndex((i) => (i < images.length - 1 ? i + 1 : 0))

  return (
    <div className="space-y-3">
      {/* Main image */}
      <div className="relative aspect-[4/3] bg-gray-50/50 rounded-2xl overflow-hidden border border-gray-100 group">
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

        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:bg-white"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:bg-white"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
            <span className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2.5 py-1 rounded-md">
              {activeIndex + 1} / {images.length}
            </span>
          </>
        )}
      </div>

      {/* Thumbnails */}
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
