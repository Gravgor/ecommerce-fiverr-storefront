import { Region } from "@medusajs/medusa"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import React, { Suspense, useMemo } from "react"

import ImageGallery from "@modules/products/components/image-gallery"
import ProductActions from "@modules/products/components/product-actions"
import ProductOnboardingCta from "@modules/products/components/product-onboarding-cta"
import ProductTabs from "@modules/products/components/product-tabs"
import RelatedProducts from "@modules/products/components/related-products"
import ProductInfo from "@modules/products/templates/product-info"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
import { notFound } from "next/navigation"
import ProductActionsWrapper from "./product-actions-wrapper"
import ProductPrice from "../components/product-price"
import { isEqual } from "lodash"
import ProductPriceActions from "../components/new/product-price-actions"
import CustomerReviews from "../components/new/product-reviews"

type ProductTemplateProps = {
  product: PricedProduct
  region: Region
  countryCode: string
}

const reviews = [
  {
    id: '0',
    author: 'Marceli',
    date: '14/10/2024',
    rating: 4.3,
    content: 'Dobry produkt'
  
  },
  {
    id: '1',
    author: 'Marceli',
    date: '14/10/2024',
    rating: 4.3,
    content: 'Dobry produkt'
  }
]

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
}) => {
  if (!product || !product.id) {
    return notFound()
  }


  return (
    <main className="max-w-container-sm mx-auto mt-10">
      <div className="grid grid-cols-1 gap-4 md:mx-auto md:max-w-screen-xl md:grid-cols-12 md:gap-8">
        <div className="md:col-span-7">
          <ImageGallery images={product.images !== undefined ? product.images : []} />
        </div>
        <div className="md:col-span-5">
          <div className="sticky top-0 pt-4">
            <div className="flex flex-col gap-y-4">
              <h1 className="text-3xl font-bold">{product.title}</h1>
              <ProductPriceActions product={product} region={region} />
              <ProductActionsWrapper id={product.id} region={region} />
              <button className="w-full border border-black py-2 rounded-md flex items-center justify-center gap-2">
                Favorite <span className="text-xl">♥</span>
              </button>
            </div>
            <ProductTabs
            product={product}
            />
          </div>
        </div>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
      <CustomerReviews reviews={reviews} averageRating={4.3}/>
      </Suspense>
      <Suspense fallback={<SkeletonRelatedProducts />}>
        <RelatedProducts product={product} countryCode={countryCode}/>
      </Suspense>
    </main>
  )
}

export default ProductTemplate