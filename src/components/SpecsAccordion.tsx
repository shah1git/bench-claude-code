'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

type SpecSection = {
  id: string
  label_ru: string
  params: { id: string; label_ru: string }[]
}

type Props = {
  specSchema: SpecSection[]
  specs: Record<string, string>
}

export function SpecsAccordion({ specSchema, specs }: Props) {
  const sectionsWithData = specSchema.filter((s) => s.params.some((p) => specs[p.id]))

  const [open, setOpen] = useState<Set<string>>(
    () => new Set(sectionsWithData.slice(0, 4).map((s) => s.id))
  )

  const toggle = (id: string) => {
    setOpen((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div className="space-y-3">
      {sectionsWithData.map((section) => {
        const rows = section.params.filter((p) => specs[p.id])
        const isOpen = open.has(section.id)

        return (
          <div key={section.id} className="border border-gray-100 rounded-xl overflow-hidden">
            <button
              onClick={() => toggle(section.id)}
              className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50/80 transition-colors text-left"
            >
              <span className="text-sm font-semibold text-gray-900 flex items-center gap-2.5">
                <span className="w-1 h-4 bg-accent/60 rounded-full" />
                {section.label_ru}
                <span className="text-xs font-normal text-gray-400">{rows.length}</span>
              </span>
              <ChevronDown
                className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
            {isOpen && (
              <div className="border-t border-gray-100">
                {rows.map((param, i) => (
                  <div
                    key={param.id}
                    className={`flex justify-between items-baseline px-5 py-3 text-sm ${
                      i % 2 === 0 ? 'bg-white' : 'bg-gray-50/40'
                    }`}
                  >
                    <span className="text-gray-500 min-w-0">{param.label_ru}</span>
                    <span className="text-gray-900 font-medium text-right ml-6 flex-shrink-0">
                      {specs[param.id]}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
