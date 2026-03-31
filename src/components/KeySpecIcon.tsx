import React from 'react'

const icons: Record<string, React.ReactNode> = {
  sensor: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <rect x="7" y="7" width="10" height="10" rx="1" />
      <line x1="12" y1="3" x2="12" y2="7" />
      <line x1="12" y1="17" x2="12" y2="21" />
      <line x1="3" y1="12" x2="7" y2="12" />
      <line x1="17" y1="12" x2="21" y2="12" />
    </svg>
  ),
  optics: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.5" />
    </svg>
  ),
  thermal: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  rangefinder: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
      <circle cx="12" cy="12" r="9" />
      <line x1="12" y1="6" x2="12" y2="10" />
      <line x1="12" y1="14" x2="12" y2="18" />
      <line x1="6" y1="12" x2="10" y2="12" />
      <line x1="14" y1="12" x2="18" y2="12" />
    </svg>
  ),
  display: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
      <rect x="2" y="4" width="20" height="13" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  ),
  weight: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
      <path d="M12 3a3 3 0 00-3 3h6a3 3 0 00-3-3z" />
      <path d="M5 8h14l-1.5 12a2 2 0 01-2 2h-7a2 2 0 01-2-2L5 8z" />
    </svg>
  ),
}

const labelToIcon: Record<string, string> = {
  'Матрица': 'sensor',
  'Сенсор': 'sensor',
  'Объектив': 'optics',
  'Линза': 'optics',
  'NETD': 'thermal',
  'Чувствительность': 'thermal',
  'Дальномер': 'rangefinder',
  'Дальность': 'rangefinder',
  'Дисплей': 'display',
  'Экран': 'display',
  'Вес': 'weight',
  'Масса': 'weight',
}

export function KeySpecIcon({ label }: { label: string }) {
  const iconKey = labelToIcon[label] || 'sensor'
  return (
    <div className="text-accent/70">
      {icons[iconKey]}
    </div>
  )
}
