export const dynamic = 'force-dynamic'

import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import { marked } from 'marked'
import Link from 'next/link'
import { formatPrice } from '@/lib/utils'
import { ProductGallery } from '@/components/ProductGallery'
import { ProductTabs } from '@/components/ProductTabs'
import { Cpu, Aperture, Crosshair, Eye, type LucideIcon } from 'lucide-react'
import { CartButtons } from '@/components/CartButtons'

const ICON_BY_LABEL: Record<string, LucideIcon> = {
  'Матрица': Cpu,
  'Объектив': Aperture,
  'Дальномер': Crosshair,
  'Обнаружение': Eye,
}

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'products',
    where: { slug: { equals: slug } },
    limit: 1,
  })
  const product = docs[0]
  if (!product) return { title: 'Товар не найден' }
  return {
    title: `${product.name} — RikaNV`,
    description: product.seoDescription || product.shortDescription,
  }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'products',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  const product = docs[0] as any
  if (!product) notFound()

  const { docs: articles } = await payload.find({
    collection: 'articles',
    where: { products: { contains: product.id } },
    limit: 20,
  })

  // Parse description markdown
  let descMd = product.description || ''
  const firstLine = descMd.split('\n')[0]
  if (firstLine.startsWith('# ')) {
    descMd = descMd.substring(firstLine.length).trimStart()
  }
  const descriptionHtml = descMd ? await marked.parse(descMd) : ''

  const images = (product.images || []).map((img: any) => ({
    url: img.url,
    filename: img.filename,
    alt: img.alt || product.name,
  }))

  // Key specs from DB
  const keySpecs = (product.keySpecs || []).map((ks: any) => ({
    ...ks,
    Icon: ICON_BY_LABEL[ks.label] || Cpu,
  }))

  // Serializable articles for tabs
  const articlesForTabs = articles.map((a: any) => ({
    id: a.id,
    slug: a.slug,
    title: a.title,
  }))

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-1.5 text-sm text-gray-400 mb-6 sm:mb-8">
        <Link href="/catalog" className="hover:text-gray-600 transition-colors">
          Каталог
        </Link>
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <span className="text-gray-600 truncate">{product.name}</span>
      </nav>

      {/* Hero: Gallery + Product Info */}
      <div className="grid grid-cols-1 lg:grid-cols-[55%_1fr] gap-8 lg:gap-12">
        <div>
          <ProductGallery images={images} />
        </div>

        <div>
          <div className="lg:sticky lg:top-24 space-y-5">
            {product.article && (
              <p className="text-xs text-gray-400 tracking-wide uppercase">
                Арт. {product.article}
              </p>
            )}

            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
              {product.name}
            </h1>

            {product.price != null && (
              <div className="text-2xl font-bold text-gray-900 tracking-tight">
                {formatPrice(product.price)}
              </div>
            )}

            {product.shortDescription && (
              <p className="text-gray-600 leading-relaxed text-[15px]">
                {product.shortDescription}
              </p>
            )}

            {/* Key Specs 2x2 */}
            {keySpecs.length > 0 && (
              <div className="grid grid-cols-2 gap-3">
                {keySpecs.map((spec: any, i: number) => {
                  const IconComp = spec.Icon
                  return (
                    <div
                      key={i}
                      className="flex items-center gap-3 rounded-xl bg-gray-50 px-4 py-3"
                    >
                      <IconComp className="w-5 h-5 text-accent/70 flex-shrink-0" />
                      <div className="min-w-0">
                        <div className="text-[11px] text-gray-400 uppercase tracking-wide">
                          {spec.label}
                        </div>
                        <div className="text-sm font-semibold text-gray-900 truncate">
                          {spec.value}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            {/* Primary CTA */}
            <a
              href="#"
              className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-white font-medium rounded-lg px-5 py-2.5 text-sm transition-colors"
            >
              Помочь с выбором &rarr;
            </a>

            {/* Secondary CTA */}
            <CartButtons />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-10 sm:mt-12">
        <ProductTabs
          descriptionHtml={descriptionHtml}
          specSchema={product.specSchema}
          specs={product.specs || {}}
          videoLinks={product.videoLinks}
          articles={articlesForTabs}
        />
      </div>

    </div>
  )
}
