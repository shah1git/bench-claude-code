export const dynamic = 'force-dynamic'

import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import { marked } from 'marked'
import Link from 'next/link'
import { formatPrice } from '@/lib/utils'
import { ProductGallery } from '@/components/ProductGallery'
import { SectionNav } from '@/components/SectionNav'
import { SpecsAccordion } from '@/components/SpecsAccordion'
import { InquiryForm } from '@/components/InquiryForm'
import { Cpu, Aperture, Thermometer, Crosshair, Eye, Scale } from 'lucide-react'

const KEY_SPEC_DEFS = [
  { key: 'sensor_resolution', label: 'Матрица', Icon: Cpu },
  { key: 'optics_objective_lens', label: 'Объектив', Icon: Aperture },
  { key: 'sensor_netd', label: 'NETD', Icon: Thermometer },
  { key: 'lrf_range', label: 'Дальномер', Icon: Crosshair },
  { key: 'detection_range', label: 'Обнаружение', Icon: Eye },
  { key: 'weight', label: 'Вес', Icon: Scale },
]

function getYouTubeId(url: string): string | null {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/)
  return match ? match[1] : null
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

  // Parse description markdown, strip redundant first h1
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

  // Build key specs from data
  const keySpecs =
    product.keySpecs?.length > 0
      ? product.keySpecs.map((ks: any) => ({
          ...ks,
          Icon: KEY_SPEC_DEFS.find((d) => d.label === ks.label)?.Icon || Cpu,
        }))
      : KEY_SPEC_DEFS.filter((d) => product.specs?.[d.key]).map((d) => ({
          label: d.label,
          value: product.specs[d.key],
          Icon: d.Icon,
        }))

  // Section navigation
  const navSections = [
    ...(descriptionHtml ? [{ id: 'description', label: 'Описание' }] : []),
    ...(product.specSchema?.length ? [{ id: 'specs', label: 'Характеристики' }] : []),
    ...(product.videoLinks?.length ? [{ id: 'video', label: 'Видео' }] : []),
    ...(articles.length ? [{ id: 'articles', label: 'Статьи' }] : []),
  ]

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

      {/* ===== HERO: Gallery + Product Info ===== */}
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
              <div className="text-3xl font-bold text-gray-900 tracking-tight">
                {formatPrice(product.price)}
              </div>
            )}

            {product.shortDescription && (
              <p className="text-gray-600 leading-relaxed text-[15px]">
                {product.shortDescription}
              </p>
            )}

            {/* Key Specs Grid 2x3 */}
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

            {/* CTA */}
            <a
              href="#inquiry"
              className="flex items-center justify-center gap-2.5 w-full bg-accent hover:bg-accent-hover text-white font-medium rounded-xl px-6 py-3.5 text-sm transition-colors"
            >
              Оставить заявку
            </a>
          </div>
        </div>
      </div>

      {/* ===== SECTION NAVIGATION (sticky) ===== */}
      {navSections.length > 0 && <SectionNav sections={navSections} />}

      {/* ===== DESCRIPTION ===== */}
      {descriptionHtml && (
        <section id="description" className="pt-10 sm:pt-12">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <span className="w-1 h-6 bg-accent rounded-full" />
            Описание
          </h2>
          <div
            className="prose max-w-4xl"
            dangerouslySetInnerHTML={{ __html: descriptionHtml }}
          />
        </section>
      )}

      {/* ===== SPECS ===== */}
      {product.specSchema?.length > 0 && (
        <section id="specs" className="pt-10 sm:pt-12">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <span className="w-1 h-6 bg-accent rounded-full" />
            Характеристики
          </h2>
          <div className="max-w-3xl">
            <SpecsAccordion specSchema={product.specSchema} specs={product.specs || {}} />
          </div>
        </section>
      )}

      {/* ===== VIDEO ===== */}
      {product.videoLinks?.length > 0 && (
        <section id="video" className="pt-10 sm:pt-12">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <span className="w-1 h-6 bg-accent rounded-full" />
            Видео
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
            {product.videoLinks.map((video: any, i: number) => {
              const ytId = getYouTubeId(video.url)
              if (!ytId) return null
              return (
                <div key={i}>
                  {video.title && (
                    <h3 className="text-sm font-medium text-gray-700 mb-2">{video.title}</h3>
                  )}
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-100">
                    <iframe
                      src={`https://www.youtube.com/embed/${ytId}`}
                      title={video.title || 'Video'}
                      className="absolute inset-0 w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      )}

      {/* ===== ARTICLES ===== */}
      {articles.length > 0 && (
        <section id="articles" className="pt-10 sm:pt-12">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <span className="w-1 h-6 bg-accent rounded-full" />
            Статьи
          </h2>
          <div className="grid gap-3 max-w-2xl">
            {articles.map((article: any) => (
              <Link
                key={article.id}
                href={`/articles/${article.slug}`}
                className="flex items-center gap-3 p-4 rounded-xl border border-gray-100 hover:border-accent/30 hover:bg-accent/5 transition-all group"
              >
                <svg
                  className="w-5 h-5 text-gray-300 group-hover:text-accent flex-shrink-0 transition-colors"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                  />
                </svg>
                <span className="text-gray-700 group-hover:text-gray-900 text-sm font-medium transition-colors flex-1">
                  {article.title}
                </span>
                <svg
                  className="w-4 h-4 text-gray-200 group-hover:text-accent flex-shrink-0 transition-colors"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ===== INQUIRY FORM ===== */}
      <section id="inquiry" className="pt-16 pb-8">
        <div className="max-w-2xl mx-auto">
          <div className="border border-gray-100 rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-1">Заказать консультацию</h2>
            <p className="text-sm text-gray-400 mb-6">
              Оставьте заявку, и наш менеджер свяжется с вами для уточнения деталей
            </p>
            <InquiryForm productId={product.id} />
          </div>
        </div>
      </section>
    </div>
  )
}
