export const dynamic = 'force-dynamic'

import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import { marked } from 'marked'
import Link from 'next/link'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'articles',
    where: { slug: { equals: slug } },
    limit: 1,
  })
  const article = docs[0]
  if (!article) return { title: 'Статья не найдена' }
  return { title: `${article.title} — RikaNV` }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'articles',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  const article = docs[0] as any
  if (!article) notFound()

  const bodyHtml = article.body ? await marked.parse(article.body) : ''

  const relatedProducts = article.products
    ? await Promise.all(
        (Array.isArray(article.products) ? article.products : []).map(async (p: any) => {
          if (typeof p === 'object') return p
          const { docs: pDocs } = await payload.find({
            collection: 'products',
            where: { id: { equals: p } },
            limit: 1,
          })
          return pDocs[0]
        })
      )
    : []

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <nav className="text-sm text-gray-400 mb-6">
        <Link href="/catalog" className="hover:text-gray-600 transition-colors">Каталог</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-600">Статья</span>
      </nav>

      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight mb-8">
        {article.title}
      </h1>

      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: bodyHtml }}
      />

      {relatedProducts.filter(Boolean).length > 0 && (
        <div className="mt-12 pt-8 border-t border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Связанные товары</h2>
          <div className="space-y-2">
            {relatedProducts.filter(Boolean).map((p: any) => (
              <Link
                key={p.id}
                href={`/catalog/${p.slug}`}
                className="flex items-center gap-2 text-accent hover:underline text-sm"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                {p.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
