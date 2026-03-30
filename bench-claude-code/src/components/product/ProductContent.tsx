'use client'

import type { Product } from '@/types/product'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { ProductDescription } from './ProductDescription'
import { ProductSpecs } from './ProductSpecs'

interface ProductContentProps {
  product: Product
}

export function ProductContent({ product }: ProductContentProps) {
  const specSchema = product.specSchema?.[product.specType]

  return (
    <Tabs defaultValue="description" className="w-full">
      <TabsList className="w-full sm:w-auto h-auto p-1 bg-muted/50">
        <TabsTrigger value="description" className="px-6 py-2.5 text-sm">
          Описание
        </TabsTrigger>
        <TabsTrigger value="specs" className="px-6 py-2.5 text-sm">
          Характеристики
        </TabsTrigger>
      </TabsList>

      <TabsContent value="description" className="mt-8">
        <ProductDescription description={product.description} />
      </TabsContent>

      <TabsContent value="specs" className="mt-8">
        <ProductSpecs
          specs={product.specs}
          sections={specSchema?.sections}
        />
      </TabsContent>
    </Tabs>
  )
}
