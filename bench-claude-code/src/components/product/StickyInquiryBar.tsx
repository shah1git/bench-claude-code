'use client'

import type { Product } from '@/types/product'
import { formatPrice } from '@/lib/utils'
import { InquiryDialog } from './InquiryDialog'

interface StickyInquiryBarProps {
  product: Product
}

export function StickyInquiryBar({ product }: StickyInquiryBarProps) {
  return (
    <div className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-sm border-t border-border/60 p-3 sm:p-4 lg:hidden z-40">
      <div className="flex items-center justify-between gap-4 max-w-7xl mx-auto">
        <div className="min-w-0">
          <p className="text-lg font-semibold tracking-tight truncate">
            {formatPrice(product.price)}
          </p>
        </div>
        <InquiryDialog
          product={product}
          triggerClassName="shrink-0"
        />
      </div>
    </div>
  )
}
