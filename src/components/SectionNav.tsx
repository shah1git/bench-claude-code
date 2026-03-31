'use client'

import { useEffect, useState, useRef } from 'react'

type Section = { id: string; label: string }

export function SectionNav({ sections }: { sections: Section[] }) {
  const [activeId, setActiveId] = useState(sections[0]?.id || '')
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: '-130px 0px -65% 0px' }
    )

    sections.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observerRef.current?.observe(el)
    })

    return () => observerRef.current?.disconnect()
  }, [sections])

  return (
    <nav className="sticky top-16 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100 mt-10">
      <div className="flex gap-0 overflow-x-auto scrollbar-hide">
        {sections.map(({ id, label }) => (
          <a
            key={id}
            href={`#${id}`}
            className={`px-5 py-3.5 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
              activeId === id
                ? 'border-accent text-accent'
                : 'border-transparent text-gray-400 hover:text-gray-700'
            }`}
          >
            {label}
          </a>
        ))}
      </div>
    </nav>
  )
}
