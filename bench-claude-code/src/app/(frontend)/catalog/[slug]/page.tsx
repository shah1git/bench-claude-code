import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'
import { ProductPage } from '@/components/product/ProductPage'
import type { Product } from '@/types/product'

export const dynamic = 'force-dynamic'

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'products',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  if (docs.length === 0) {
    notFound()
  }

  const doc = docs[0]

  const product: Product = {
    id: String(doc.id),
    name: doc.name,
    slug: doc.slug,
    price: doc.price,
    wholeSalePrice: doc.wholeSalePrice ?? undefined,
    vipPrice: doc.vipPrice ?? undefined,
    article: doc.article,
    xmlId: doc.xmlId ?? undefined,
    specType: doc.specType ?? '',
    formFactor: doc.formFactor ?? undefined,
    productLine: doc.productLine ?? undefined,
    specs: (doc.specs as Record<string, string>) ?? {},
    images: (doc.images ?? []) as Product['images'],
    shortDescription: doc.shortDescription ?? undefined,
    description: doc.description ?? undefined,
    specSchema: (doc.specSchema as Product['specSchema']) ?? undefined,
    keySpecs: (doc.keySpecs ?? []) as Product['keySpecs'],
  }

  return <ProductPage product={product} />
}
