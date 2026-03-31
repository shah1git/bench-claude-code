'use client'

import { useState } from 'react'

export function InquiryForm({ productId }: { productId: number }) {
  const [form, setForm] = useState({ name: '', phone: '', email: '', comment: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone || undefined,
          email: form.email || undefined,
          comment: form.comment || undefined,
          product: Number(productId),
        }),
      })

      if (res.ok) {
        setStatus('success')
        setForm({ name: '', phone: '', email: '', comment: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
        <p className="text-green-800 font-medium text-lg">Заявка отправлена</p>
        <p className="text-green-600 mt-1 text-sm">Наш менеджер свяжется с вами в ближайшее время</p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-4 text-sm text-green-700 underline underline-offset-2 hover:no-underline"
        >
          Отправить ещё
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label htmlFor="inq-name" className="block text-sm font-medium text-gray-700 mb-1">
            Имя <span className="text-red-500">*</span>
          </label>
          <input
            id="inq-name"
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-colors"
            placeholder="Ваше имя"
          />
        </div>
        <div>
          <label htmlFor="inq-phone" className="block text-sm font-medium text-gray-700 mb-1">
            Телефон
          </label>
          <input
            id="inq-phone"
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-colors"
            placeholder="+7 (___) ___-__-__"
          />
        </div>
        <div>
          <label htmlFor="inq-email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            id="inq-email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-colors"
            placeholder="email@example.com"
          />
        </div>
      </div>
      <div>
        <label htmlFor="inq-comment" className="block text-sm font-medium text-gray-700 mb-1">
          Комментарий
        </label>
        <textarea
          id="inq-comment"
          rows={3}
          value={form.comment}
          onChange={(e) => setForm({ ...form, comment: e.target.value })}
          className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-colors resize-none"
          placeholder="Ваш вопрос или комментарий"
        />
      </div>

      {status === 'error' && (
        <p className="text-red-600 text-sm">Произошла ошибка. Попробуйте ещё раз.</p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full sm:w-auto bg-accent hover:bg-accent-hover text-white font-medium rounded-lg px-8 py-3 text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? 'Отправка...' : 'Отправить заявку'}
      </button>
    </form>
  )
}
