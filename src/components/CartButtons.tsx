'use client'

import { ShoppingCart, Zap } from 'lucide-react'

export function CartButtons() {
  return (
    <div className="flex gap-3 pt-1">
      <button
        type="button"
        onClick={() => alert('Функция в разработке')}
        className="flex-1 inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-white font-medium rounded-lg px-5 py-2.5 text-sm transition-colors"
      >
        <ShoppingCart className="w-4 h-4" />
        В корзину
      </button>
      <button
        type="button"
        onClick={() => alert('Функция в разработке')}
        className="flex-1 inline-flex items-center justify-center gap-2 border border-gray-300 text-gray-700 hover:border-gray-400 font-medium rounded-lg px-5 py-2.5 text-sm transition-colors"
      >
        <Zap className="w-4 h-4" />
        Купить в 1 клик
      </button>
    </div>
  )
}
