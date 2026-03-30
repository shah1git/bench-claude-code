import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'

export const dynamic = 'force-dynamic'

export default async function CatalogPage() {
  const payload = await getPayload({ config })
  const { docs: products } = await payload.find({
    collection: 'products',
    limit: 50,
  })

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-semibold tracking-tight mb-8">Каталог</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/catalog/${product.slug}`}
            className="group block border rounded-lg p-6 hover:border-foreground/20 transition-colors"
          >
            {product.images && product.images[0] && (
              <div className="aspect-[4/3] mb-4 flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={product.images[0].url}
                  alt={product.images[0].alt || product.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            )}
            <h2 className="font-medium group-hover:text-primary transition-colors">{product.name}</h2>
            <p className="text-sm text-muted-foreground mt-1">{product.productLine}</p>
            <p className="text-lg font-semibold mt-2">
              {new Intl.NumberFormat('ru-RU').format(product.price)} ₽
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}
