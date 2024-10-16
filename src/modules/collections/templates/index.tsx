import { ProductCollection } from "@medusajs/medusa"
import { Suspense } from "react"
import { ChevronRight } from "lucide-react"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "@modules/store/templates/paginated-products"

export default function CollectionTemplate({
  sortBy,
  collection,
  page,
  countryCode,
}: {
  sortBy?: SortOptions
  collection: ProductCollection
  page?: string
  countryCode: string
}) {
  const pageNumber = page ? parseInt(page) : 1

  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-4 sm:py-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900">{collection.title}</h1>
            <div className="flex items-center text-sm text-gray-500">
              <a href="/" className="hover:text-gray-700">Home</a>
              <ChevronRight className="mx-2 h-4 w-4" />
              <span className="font-medium text-gray-900">{collection.title}</span>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-start">
            <div className="w-full lg:w-64 mb-8 lg:mb-0">
              <RefinementList sortBy={sortBy || "created_at"} />
            </div>
            <div className="flex-1 lg:ml-8">
              <Suspense fallback={<SkeletonProductGrid />}>
                <PaginatedProducts
                  sortBy={sortBy || "created_at"}
                  page={pageNumber}
                  collectionId={collection.id}
                  countryCode={countryCode}
                />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}