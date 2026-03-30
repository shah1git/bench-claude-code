'use client'

import { useState } from 'react'
import type { Product } from '@/types/product'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { InquiryForm } from './InquiryForm'

interface InquiryDialogProps {
  product: Product
  triggerClassName?: string
}

export function InquiryDialog({ product, triggerClassName }: InquiryDialogProps) {
  const [open, setOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  return (
    <>
      <Button
        size="lg"
        onClick={() => {
          setOpen(true)
          setSubmitted(false)
        }}
        className={triggerClassName}
      >
        Оставить заявку
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          {submitted ? (
            <div className="py-6 text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <DialogHeader>
                <DialogTitle>Заявка отправлена</DialogTitle>
                <DialogDescription className="mt-2">
                  Наш менеджер свяжется с вами в ближайшее время для уточнения деталей заказа.
                </DialogDescription>
              </DialogHeader>
              <Button
                variant="outline"
                className="mt-6"
                onClick={() => setOpen(false)}
              >
                Закрыть
              </Button>
            </div>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>Заявка на покупку</DialogTitle>
                <DialogDescription>
                  {product.name} — {new Intl.NumberFormat('ru-RU').format(product.price)} ₽
                </DialogDescription>
              </DialogHeader>
              <InquiryForm
                productId={product.id}
                onSuccess={() => setSubmitted(true)}
              />
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
