'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

interface InquiryFormProps {
  productId: string
  onSuccess: () => void
}

export function InquiryForm({ productId, onSuccess }: InquiryFormProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const form = e.currentTarget
    const data = new FormData(form)

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.get('name'),
          phone: data.get('phone'),
          email: data.get('email') || undefined,
          comment: data.get('comment') || undefined,
          productId,
        }),
      })

      if (!res.ok) {
        const body = await res.json()
        throw new Error(body.error || 'Ошибка отправки')
      }

      onSuccess()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка отправки')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="inquiry-name">Имя *</Label>
        <Input
          id="inquiry-name"
          name="name"
          required
          placeholder="Ваше имя"
          autoComplete="name"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="inquiry-phone">Телефон *</Label>
        <Input
          id="inquiry-phone"
          name="phone"
          type="tel"
          required
          placeholder="+7 (___) ___-__-__"
          autoComplete="tel"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="inquiry-email">
          Email <span className="text-muted-foreground font-normal">(необязательно)</span>
        </Label>
        <Input
          id="inquiry-email"
          name="email"
          type="email"
          placeholder="email@example.com"
          autoComplete="email"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="inquiry-comment">
          Комментарий <span className="text-muted-foreground font-normal">(необязательно)</span>
        </Label>
        <Textarea
          id="inquiry-comment"
          name="comment"
          placeholder="Вопросы, пожелания к заказу..."
          rows={3}
        />
      </div>

      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}

      <Button type="submit" className="w-full" size="lg" disabled={loading}>
        {loading ? 'Отправка...' : 'Отправить заявку'}
      </Button>
    </form>
  )
}
