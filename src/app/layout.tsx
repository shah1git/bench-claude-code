import React from 'react'

export const metadata = {
  title: 'RikaNV — тепловизионная оптика',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  )
}
