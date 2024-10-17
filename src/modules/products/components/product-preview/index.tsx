import { Text } from "@medusajs/ui"
import { ProductPreviewType } from "types/global"
import { getProductsById, retrievePricedProductById } from "@lib/data"
import { getProductPrice } from "@lib/util/get-product-price"
import { Region } from "@medusajs/medusa"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import { Star, StarIcon } from "lucide-react"
import Image from "next/image"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"

export default async function ProductPreview({
  productPreview,
  region,
}: {
  productPreview: ProductPreviewType
  region: Region
}) {
  console.log(productPreview)
  const pricedProduct = await retrievePricedProductById({
    id: productPreview?.id ?? "",  // Use optional chaining and nullish coalescing operator
    regionId: region?.id ?? "",
  }).then((product) => product)

  if (!pricedProduct) {
    return null
  }

  const { cheapestPrice } = getProductPrice({
    product: pricedProduct,
    region,
  })


  const variants = pricedProduct.variants


  const rating = 4.5 // Mock rating
  const reviews: any = 10 // Mock review count

  return (
    <LocalizedClientLink
      href={`/products/${productPreview.handle}`}
      className="group flex h-full w-full flex-col overflow-hidden transition-all hover:shadow-md"
    >
      <div className="relative aspect-square overflow-hidden">
        <Image
          priority
          className="object-cover transition-transform group-hover:scale-105"
          src={productPreview?.thumbnail ?? ""}
          alt={productPreview?.title ?? ""}
          fill
        />
      </div>
      <div className="flex shrink-0 grow flex-col gap-2 p-4">
        <h3 className="line-clamp-2 text-lg font-semibold transition-colors group-hover:text-orange-500">
          {productPreview?.title?.split(" ").slice(1).join(" ")}
        </h3>
        <div className="mt-auto flex flex-col gap-1">
          <p className="text-sm text-orange-400">Test vendor</p>
          {variants && variants.length > 0 && (
            <p className="text-sm text-gray-500">
              {variants.length} variant{variants.length > 1 ? "s" : ""}
            </p>
          )}
          {!!rating && !!reviews && (
            <div className="flex items-center space-x-1">
              <StarIcon className='size-4 fill-yellow-400 stroke-yellow-500' />
              <span className="text-sm">{rating.toFixed(2)}</span>
              <span className="text-xs">
                ({reviews} review{reviews !== 1 && 's'})
              </span>
              </div>
          )}
          {!!cheapestPrice && <span>From {cheapestPrice?.calculated_price}</span>}
        </div>
      </div>
    </LocalizedClientLink>
  )
}
