'use client'

import type { SpecSection } from '@/types/product'
import { SPEC_LABELS } from '@/types/product'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'

interface ProductSpecsProps {
  specs: Record<string, string>
  sections?: SpecSection[]
}

export function ProductSpecs({ specs, sections }: ProductSpecsProps) {
  if (!sections || sections.length === 0) {
    // Fallback: flat list
    return (
      <div className="max-w-3xl">
        <SpecTable specs={specs} params={Object.keys(specs)} />
      </div>
    )
  }

  // First section open by default
  return (
    <div className="max-w-3xl">
      <Accordion type="multiple" defaultValue={[sections[0].id]}>
        {sections.map((section) => {
          const sectionSpecs = section.params.filter((p) => specs[p] !== undefined)
          if (sectionSpecs.length === 0) return null

          return (
            <AccordionItem key={section.id} value={section.id}>
              <AccordionTrigger className="text-base font-medium hover:no-underline">
                {section.label_ru}
                <span className="ml-2 text-xs text-muted-foreground font-normal">
                  {sectionSpecs.length}
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <SpecTable specs={specs} params={sectionSpecs} />
              </AccordionContent>
            </AccordionItem>
          )
        })}
      </Accordion>
    </div>
  )
}

function SpecTable({
  specs,
  params,
}: {
  specs: Record<string, string>
  params: string[]
}) {
  return (
    <div className="divide-y divide-border/60">
      {params.map((param) => (
        <div
          key={param}
          className="flex justify-between items-baseline py-2.5 gap-4"
        >
          <span className="text-sm text-muted-foreground shrink-0">
            {SPEC_LABELS[param] || param}
          </span>
          <span className="text-sm font-medium text-right">
            {specs[param]}
          </span>
        </div>
      ))}
    </div>
  )
}
