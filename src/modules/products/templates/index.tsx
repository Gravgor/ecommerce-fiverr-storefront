import { Region } from "@medusajs/medusa"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import React, { Suspense, useState } from "react"
import { notFound, useParams } from "next/navigation"
import { ChevronLeft, ChevronRight, Heart } from "lucide-react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ImageGallery from "@modules/products/components/image-gallery"
import ProductTabs from "@modules/products/components/product-tabs"
import RelatedProducts from "@modules/products/components/related-products"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
import { Button } from "@modules/layout/components/ui/button"
import ProductActionsWrapper from "./product-actions-wrapper"

type ProductTemplateProps = {
  product: PricedProduct
  region: Region
  countryCode: string
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
}) => {
  if (!product || !product.id) {
    return notFound()
  }

  const { title, description, variants } = product
  const price =
    variants[0]?.prices.find((p) => p.currency_code === region.currency_code)
      ?.amount || 0
  const formattedPrice = new Intl.NumberFormat(region.currency_code, {
    style: "currency",
    currency: region.currency_code,
  }).format(price / 100)

  return (
    <main className="max-w-[1440px] mx-auto px-4 py-6">
      
        <div className="flex gap-">
         <LocalizedClientLink href="/">
         <p className="text-normal text-gray-400 hover:underline">
            Home
          </p>
         </LocalizedClientLink>
        <ChevronRight className="w-6 h-6" />
       <LocalizedClientLink
       href={`/collections/${product.collection?.handle}`}>
         <p className="text-normal text-gray-400 hover:underline">
          {product.collection?.title}
        </p>
       </LocalizedClientLink>
        <ChevronRight className="w-6 h-6" />
        <LocalizedClientLink
        href={`/products/${product.handle}`}>
          <p className="font-bold underline text-gray-400">
          {product.title}
        </p>
        </LocalizedClientLink>
        </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="relative aspect-square mb-4">
          <ImageGallery images={product.images || []} />
        </div>
        <div>
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="text-2xl font-semibold mb-2">From {formattedPrice}</p>

          <ProductActionsWrapper id={product.id} region={region} />
          <Button
            variant="outline"
            className="w-full py-3 rounded-md mb-6 flex items-center justify-center"
          >
            <Heart className="mr-2" /> Favorite
          </Button>

          <ProductTabs product={product} />
        </div>
      </div>
      <Suspense fallback={<SkeletonRelatedProducts />}>
        <RelatedProducts product={product} countryCode={countryCode} />
      </Suspense>
    </main>
  )
}

export default ProductTemplate
