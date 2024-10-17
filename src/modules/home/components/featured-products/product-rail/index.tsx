import { Region } from "@medusajs/medusa"
import { ProductCollectionWithPreviews } from "types/global"
import ProductPreview from "@modules/products/components/product-preview"
import { CarouselSection } from "./CarouselSection"

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

  return <CarouselSection region={region} items={products} title="Best offer" />
}