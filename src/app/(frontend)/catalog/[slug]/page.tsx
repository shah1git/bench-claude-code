export const dynamic = 'force-dynamic'

import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import { marked } from 'marked'
import { formatPrice } from '@/lib/utils'
import { ProductGallery } from '@/components/ProductGallery'
import { ProductTabs } from '@/components/ProductTabs'
import { InquiryForm } from '@/components/InquiryForm'

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
        { label: 'Дисплей', value: `${product.specs?.display_type || ''} ${product.specs?.display_resolution || ''}` },
        { label: 'Вес', value: product.specs?.weight || '' },
      ].filter((s: any) => s.value)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* Breadcrumbs */}
      <nav className="text-sm text-gray-400 mb-6">
        <a href="/catalog" className="hover:text-gray-600 transition-colors">Каталог</a>
        <span className="mx-2">/</span>
        <span className="text-gray-600">{product.name}</span>
      </nav>

      {/* Top section: Gallery + Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Gallery */}
        <ProductGallery images={images} />

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
              {product.name}
            </h1>
            {product.article && (
              <p className="text-sm text-gray-400 mt-1">Артикул: {product.article}</p>
            )}
          </div>

          {product.price && (
            <div className="text-3xl font-bold text-gray-900">
              {formatPrice(product.price)}
            </div>
          )}

          {product.shortDescription && (
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
              {product.shortDescription}
            </p>
          )}

          {/* Key Specs */}
          {keySpecs.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {keySpecs.map((spec: any, i: number) => (
                <div key={i} className="bg-gray-50 rounded-lg p-3">
                  <div className="text-xs text-gray-400 uppercase tracking-wide">{spec.label}</div>
                  <div className="text-sm font-semibold text-gray-900 mt-0.5">{spec.value}</div>
                </div>
              ))}
            </div>
          )}

          {/* CTA Button */}
          <a
            href="#inquiry"
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white font-medium rounded-lg px-6 py-3 text-sm transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Оставить заявку
          </a>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="mt-12 border-t border-gray-100 pt-8">
        <ProductTabs
          description={descriptionHtml}
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

      {/* Inquiry Form */}
      <div id="inquiry" className="mt-16 scroll-mt-24">
        <div className="max-w-3xl mx-auto bg-gray-50 rounded-2xl p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-1">Заказать консультацию</h2>
          <p className="text-sm text-gray-500 mb-6">
            Оставьте заявку, и наш менеджер свяжется с вами для уточнения деталей
          </p>
          <InquiryForm productId={product.id} />
        </div>
      </div>
    </div>
  )
}
