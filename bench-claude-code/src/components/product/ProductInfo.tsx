import type { Product } from '@/types/product'
import { Badge } from '@/components/ui/badge'
import { formatPrice } from '@/lib/utils'
import { KeySpecsGrid } from './KeySpecsGrid'
import { InquiryDialog } from './InquiryDialog'

interface ProductInfoProps {
  product: Product
}

export function ProductInfo({ product }: ProductInfoProps) {
  return (
    <div className="flex flex-col justify-center">
      {/* Product line & article */}
      <div className="flex items-center gap-3 mb-4">
        {product.productLine && (
          <Badge variant="secondary" className="text-xs tracking-wide uppercase">
            {product.productLine}
          </Badge>
        )}
        <span className="text-xs text-muted-foreground">
          Арт. {product.article}
        </span>
      </div>

      {/* Name */}
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-foreground leading-tight">
        {product.name}
      </h1>

      {/* Short description */}
      {product.shortDescription && (
        <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
          {product.shortDescription}
        </p>
      )}

      {/* Key specs */}
      {product.keySpecs && product.keySpecs.length > 0 && (
        <div className="mt-8">
          <KeySpecsGrid specs={product.keySpecs} />
        </div>
      )}

      {/* Price + CTA */}
      <div className="mt-8 pt-8 border-t border-border/60">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Розничная цена</p>
            <p className="text-3xl font-semibold tracking-tight">
              {formatPrice(product.price)}
            </p>
          </div>
          <InquiryDialog product={product} />
        </div>
      </div>
    </div>
  )
}
