'use client'

import { ShoppingCart } from 'lucide-react'

export function CartButtons() {
  return (
    <div className="pt-1">
      <button
        type="button"
        onClick={() => alert('Функция в разработке')}
        className="inline-flex items-center justify-center gap-2 border border-gray-300 text-gray-600 hover:text-gray-900 hover:border-gray-400 font-medium rounded-lg px-5 py-2.5 text-sm transition-colors"
      >
        <ShoppingCart className="w-4 h-4" />
        В корзину
      </button>
    </div>
  )
}
