import { Region } from "@medusajs/medusa"
import { Text } from "@medusajs/ui"
import { ChevronRight } from "lucide-react"

import InteractiveLink from "@modules/common/components/interactive-link"
import ProductPreview from "@modules/products/components/product-preview"
import { ProductCollectionWithPreviews } from "types/global"

export default function ProductRail({
  collection,
  region,
}: {
  collection: ProductCollectionWithPreviews
  region: Region
}) {
  const { products } = collection

  if (!products) {
    return null
  }

  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <Text className="text-2xl sm:text-3xl font-bold text-gray-900">{collection.title}</Text>
          <InteractiveLink href={`/collections/${collection.handle}`}>
            View all
            <ChevronRight className="ml-1 w-4 h-4" />
          </InteractiveLink>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
          {products.map((product) => (
            <ProductPreview
              key={product.id}
              productPreview={product}
              region={region}
            />
          ))}
        </div>
      </div>
    </div>
  )
}