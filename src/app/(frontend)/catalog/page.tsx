export const dynamic = 'force-dynamic'

import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link'
import Image from 'next/image'
import { formatPrice } from '@/lib/utils'

export const metadata = {
  title: 'Каталог — RikaNV',
}

export default async function CatalogPage() {
  const payload = await getPayload({ config })
  const { docs: products } = await payload.find({
    collection: 'products',
    limit: 50,
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Каталог</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product: any) => {
          const firstImage = product.images?.[0]
          return (
            <Link
              key={product.id}
              href={`/catalog/${product.slug}`}
              className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg hover:border-gray-200 transition-all duration-200"
            >
              <div className="relative aspect-square bg-gray-50/50">
                {firstImage && (
                  <Image
                    src={firstImage.url}
                    alt={firstImage.alt || product.name}
                    fill
                    className="object-contain p-8 group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                )}
              </div>
              <div className="p-5">
                <h2 className="font-semibold text-gray-900 group-hover:text-accent transition-colors leading-snug">
                  {product.name}
                </h2>
                {product.shortDescription && (
                  <p className="text-sm text-gray-500 mt-2 line-clamp-2 leading-relaxed">
                    {product.shortDescription}
                  </p>
                )}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-50">
                  {product.price && (
                    <span className="text-lg font-bold text-gray-900">
                      {formatPrice(product.price)}
                    </span>
                  )}
                  <span className="text-sm text-accent font-medium group-hover:translate-x-0.5 transition-transform">
                    Подробнее &rarr;
                  </span>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
