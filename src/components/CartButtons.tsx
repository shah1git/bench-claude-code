'use client'

import { ShoppingCart } from 'lucide-react'

export function CartButtons() {
  return (
    <div className="pt-1">
      <button
        type="button"
        onClick={() => alert('Функция в разработке')}
        className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-white font-medium rounded-lg px-5 py-2.5 text-sm transition-colors"
      >
        <ShoppingCart className="w-4 h-4" />
        В корзину
      </button>
    </div>
  )
}
