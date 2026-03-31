import Link from 'next/link'

export function Header() {
  return (
    <header className="border-b border-gray-100 bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/catalog" className="text-xl font-bold tracking-tight text-gray-900">
            RikaNV
          </Link>
          <span className="inline-flex items-center rounded-md bg-gray-900 px-2.5 py-0.5 text-xs font-medium text-white">
            Claude Code
          </span>
        </div>
        <nav className="hidden sm:flex items-center gap-6 text-sm text-gray-600">
          <Link href="/catalog" className="hover:text-gray-900 transition-colors">
            Каталог
          </Link>
        </nav>
      </div>
    </header>
  )
}
