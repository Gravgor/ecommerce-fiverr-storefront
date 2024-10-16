import { Text } from "@medusajs/ui"
import { ProductPreviewType } from "types/global"
import { retrievePricedProductById } from "@lib/data"
import { getProductPrice } from "@lib/util/get-product-price"
import { Region } from "@medusajs/medusa"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import { Star } from "lucide-react"

export default async function ProductPreview({
  productPreview,
  region,
}: {
  productPreview: ProductPreviewType
  region: Region
}) {
  const pricedProduct = await retrievePricedProductById({
    id: productPreview.id,
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
  const mockBrand = "Brand Name"
  const mockVariants = 5
  const mockRating = 4.5
  const mockReviews = 10

  return (
    <LocalizedClientLink
      href={`/products/${productPreview.handle}`}
      className="group"
    >
      <div className="flex flex-col space-y-4">
        <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-200 group-hover:opacity-75 transition-opacity duration-200">
          <Thumbnail
            thumbnail={productPreview.thumbnail}
            size="full"
            className="object-cover object-center"
          />
        </div>
        <div className="flex flex-col space-y-1">
          <Text className="text-sm text-gray-500">{mockBrand}</Text>
          <Text className="text-base font-medium text-gray-900 line-clamp-2">
            {productPreview.title}
          </Text>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(mockRating) ? "text-yellow-400" : "text-gray-300"
                }`}
                fill="currentColor"
              />
            ))}
            <Text className="ml-1 text-sm text-gray-500">
              {mockRating.toFixed(1)} ({mockReviews})
            </Text>
          </div>
          <div className="flex items-center justify-between mt-2">
            <div>
              {cheapestPrice && (
                <Text className="text-base font-medium text-gray-900">
                  {cheapestPrice.calculated_price}
                </Text>
              )}
            </div>
            <Text className="text-sm text-gray-500">{mockVariants} variants</Text>
          </div>
        </div>
      </div>
    </LocalizedClientLink>
  )
}