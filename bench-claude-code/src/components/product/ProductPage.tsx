import type { Product } from '@/types/product'
import { ProductGallery } from './ProductGallery'
import { ProductInfo } from './ProductInfo'
import { ProductContent } from './ProductContent'
import { StickyInquiryBar } from './StickyInquiryBar'

interface ProductPageProps {
  product: Product
}

export function ProductPage({ product }: ProductPageProps) {
  return (
    <div className="pb-24 lg:pb-12">
      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4 pb-2">
        <nav className="flex text-sm text-muted-foreground" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1.5">
            <li><a href="/" className="hover:text-foreground transition-colors">Главная</a></li>
            <li className="text-border">/</li>
            <li><a href="/catalog" className="hover:text-foreground transition-colors">Каталог</a></li>
            <li className="text-border">/</li>
            <li className="text-foreground">{product.name}</li>
          </ol>
        </nav>
      </div>

      {/* Hero: Gallery + Info */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          <ProductGallery images={product.images} productName={product.name} />
          <ProductInfo product={product} />
        </div>
      </section>

      {/* Divider */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <hr className="border-border/60" />
      </div>

      {/* Description + Specs */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <ProductContent product={product} />
      </section>

      {/* Mobile sticky CTA */}
      <StickyInquiryBar product={product} />
    </div>
  )
}
