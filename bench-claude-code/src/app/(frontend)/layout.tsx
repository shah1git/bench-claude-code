import React from 'react'

export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <header className="border-b border-border/40 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <a href="/" className="text-xl font-semibold tracking-tight text-foreground">
              RikaNV
            </a>
            <nav className="hidden sm:flex items-center gap-8 text-sm text-muted-foreground">
              <a href="/catalog" className="hover:text-foreground transition-colors">Каталог</a>
              <a href="#" className="hover:text-foreground transition-colors">О бренде</a>
              <a href="#" className="hover:text-foreground transition-colors">Контакты</a>
            </nav>
          </div>
        </div>
      </header>
      <main>{children}</main>
    </>
  )
}
