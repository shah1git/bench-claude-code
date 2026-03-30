import type { KeySpec } from '@/types/product'

interface KeySpecsGridProps {
  specs: KeySpec[]
}

export function KeySpecsGrid({ specs }: KeySpecsGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-border/60 rounded-lg overflow-hidden">
      {specs.map((spec) => (
        <div
          key={spec.label}
          className="bg-background p-3 sm:p-4 text-center"
        >
          <p className="text-xs text-muted-foreground mb-1">{spec.label}</p>
          <p className="text-sm sm:text-base font-semibold tracking-tight">{spec.value}</p>
        </div>
      ))}
    </div>
  )
}
