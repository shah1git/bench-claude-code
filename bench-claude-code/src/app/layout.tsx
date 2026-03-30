import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'RikaNV — Профессиональная тепловизионная оптика',
  description: 'Тепловизионные прицелы и монокуляры для охоты и спортивной стрельбы',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className="font-sans">
        {children}
      </body>
    </html>
  )
}
