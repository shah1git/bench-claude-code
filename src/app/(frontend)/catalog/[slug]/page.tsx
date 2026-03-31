export const dynamic = 'force-dynamic'

import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import { marked } from 'marked'
import Link from 'next/link'
import { formatPrice } from '@/lib/utils'
import { ProductGallery } from '@/components/ProductGallery'
import { ProductTabs } from '@/components/ProductTabs'
import { InquiryForm } from '@/components/InquiryForm'
import { KeySpecIcon } from '@/components/KeySpecIcon'

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
    where: {
      products: { contains: product.id },
    },
    limit: 20,
  })

  const descriptionHtml = product.description ? await marked.parse(product.description) : ''

  const images = (product.images || []).map((img: any) => ({
    url: img.url,
    filename: img.filename,
    alt: img.alt || product.name,
  }))

  const keySpecs = product.keySpecs?.length
    ? product.keySpecs
    : [
        { label: 'Матрица', value: product.specs?.sensor_resolution || '' },
        { label: 'Объектив', value: product.specs?.optics_objective_lens || '' },
        { label: 'NETD', value: product.specs?.sensor_netd || '' },
        { label: 'Дальномер', value: product.specs?.lrf_range || '' },
        {
          label: 'Дисплей',
          value:
            `${product.specs?.display_type || ''} ${product.specs?.display_resolution || ''}`.trim(),
        },
        { label: 'Вес', value: product.specs?.weight || '' },
      ].filter((s: any) => s.value)

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

      {/* ===== TOP BLOCK: Gallery + Info (two columns on desktop) ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Gallery — 7 of 12 columns */}
        <div className="lg:col-span-7">
          <ProductGallery images={images} />
        </div>

        {/* Product Info — 5 of 12 columns */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-24 space-y-5">
            {/* Article number */}
            {product.article && (
              <p className="text-xs text-gray-400 tracking-wide uppercase">
                Арт. {product.article}
              </p>
            )}

            {/* Product name */}
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
              {product.name}
            </h1>

            {/* Price */}
            {product.price && (
              <div className="text-3xl font-bold text-gray-900 tracking-tight">
                {formatPrice(product.price)}
              </div>
            )}

            {/* Short description */}
            {product.shortDescription && (
              <p className="text-gray-600 leading-relaxed text-[15px]">
                {product.shortDescription}
              </p>
            )}

            {/* Key Specs with icons */}
            {keySpecs.length > 0 && (
              <div className="border border-gray-100 rounded-xl divide-y divide-gray-100 bg-gray-50/30">
                {keySpecs.map((spec: any, i: number) => (
                  <div key={i} className="flex items-center gap-3 px-4 py-3">
                    <KeySpecIcon label={spec.label} />
                    <div className="min-w-0 flex-1">
                      <div className="text-xs text-gray-400">{spec.label}</div>
                      <div className="text-sm font-semibold text-gray-900 truncate">
                        {spec.value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* CTA Button */}
            <a
              href="#inquiry"
              className="flex items-center justify-center gap-2.5 w-full bg-accent hover:bg-accent-hover text-white font-medium rounded-xl px-6 py-3.5 text-sm transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              Оставить заявку
            </a>
          </div>
        </div>
      </div>

      {/* ===== FULL DESCRIPTION — separate section, always visible ===== */}
      {descriptionHtml && (
        <section className="mt-12 sm:mt-16">
          <div className="border-t border-gray-100 pt-8 sm:pt-10">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="w-1 h-6 bg-accent rounded-full" />
              Описание
            </h2>
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: descriptionHtml }}
            />
          </div>
        </section>
      )}

      {/* ===== TABS: Specs, Video, Articles ===== */}
      <div className="mt-12 sm:mt-16 border-t border-gray-100 pt-8">
        <ProductTabs
          specSchema={product.specSchema || []}
          specs={product.specs || {}}
          videoLinks={product.videoLinks || []}
          articles={articles.map((a: any) => ({
            id: a.id,
            title: a.title,
            slug: a.slug,
          }))}
        />
      </div>

      {/* ===== INQUIRY FORM ===== */}
      <div id="inquiry" className="mt-16 scroll-mt-24">
        <div className="max-w-2xl mx-auto">
          <div className="border border-gray-100 rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-1">Заказать консультацию</h2>
            <p className="text-sm text-gray-400 mb-6">
              Оставьте заявку, и наш менеджер свяжется с вами для уточнения деталей
            </p>
            <InquiryForm productId={product.id} />
          </div>
        </div>
      </div>
    </div>
  )
}
