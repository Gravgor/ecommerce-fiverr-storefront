import { Text } from "@medusajs/ui"
import { ProductPreviewType } from "types/global"
import { retrievePricedProductById } from "@lib/data"
import { getProductPrice } from "@lib/util/get-product-price"
import { Region } from "@medusajs/medusa"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import { Star } from "lucide-react"

export default async function ProductPreview({
  product,
  region,
}: {
  product: ProductPreviewType
  region: Region
}) {
  const pricedProduct = await retrievePricedProductById({
    id: product.id,
    regionId: region.id,
  }).then((product) => product)

  if (!pricedProduct) {
    return null
  }

  const { cheapestPrice } = getProductPrice({
    product: pricedProduct,
    region,
  })

  // Mock data for fields not available in productPreview
  const mockBrand = "TimeTrend"
  const mockVariants = 5
  const mockRating = 4.5
  const mockReviews = 10

  return (
    <LocalizedClientLink
      href={`/products/${product.handle}`}
      className="group w-64 flex-shrink-0"
    >
      <div className="aspect-square mb-2">
        <Thumbnail thumbnail={product.thumbnail} size="full" />
      </div>
      <h3 className="text-lg font-semibold mb-1">{product.title}</h3>
      <p className="text-sm text-gray-600 mb-1">{mockBrand}</p>
      <p className="text-sm text-gray-600 mb-2">{mockVariants} variants</p>
      <div className="flex items-center mb-2">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < Math.floor(mockRating) ? "text-yellow-400" : "text-gray-300"
            }`}
            fill="currentColor"
          />
        ))}
        <span className="ml-1 text-sm text-gray-600">
          {mockRating.toFixed(1)} ({mockReviews})
        </span>
      </div>
      {cheapestPrice && (
        <p className="text-lg font-semibold">
          From {cheapestPrice.calculated_price}
        </p>
      )}
    </LocalizedClientLink>
  )
}