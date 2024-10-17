import { Product } from "@medusajs/medusa"
import { Metadata } from "next"

import { getCollectionsList, getProductsList, getRegion } from "@lib/data"
import FeaturedProducts from "@modules/home/components/featured-products"
import { ProductCollectionWithPreviews } from "types/global"
import { cache } from "react"
import ShopByCategory from "@modules/home/components/categories"
import { HeroSection } from "@modules/home/components/hero"

export const metadata: Metadata = {
  title: "Test shop",
  description: "E commerce shop",
}

export const mockFeaturedProducts = [
  {
    id: "1",
    name: "Wireless Noise-Cancelling Headphones",
    description:
      "Experience crystal-clear audio with our premium noise-cancelling headphones.",
    price: 299.99,
    image: "/placeholder.svg",
    slug: "wireless-noise-cancelling-headphones",
  },
  {
    id: "2",
    name: "Smart Fitness Watch",
    description:
      "Track your health and fitness goals with our advanced smartwatch.",
    price: 199.99,
    image: "/placeholder.svg",
    slug: "smart-fitness-watch",
  },
  {
    id: "3",
    name: "Eco-Friendly Water Bottle",
    description:
      "Stay hydrated and eco-conscious with our reusable stainless steel water bottle.",
    price: 24.99,
    image: "/placeholder.svg",
    slug: "eco-friendly-water-bottle",
  },
  {
    id: "4",
    name: "Portable Solar Charger",
    description:
      "Charge your devices on the go with this compact and efficient solar power bank.",
    price: 49.99,
    image: "/placeholder.svg",
    slug: "portable-solar-charger",
  },
  {
    id: "5",
    name: "Ergonomic Office Chair",
    description:
      "Improve your posture and comfort with our adjustable ergonomic office chair.",
    price: 249.99,
    image: "/placeholder.svg",
    slug: "ergonomic-office-chair",
  },
]

const getCollectionsWithProducts = cache(
  async (
    countryCode: string
  ): Promise<ProductCollectionWithPreviews[] | null> => {
    const { collections } = await getCollectionsList(0, 5)

    if (!collections) {
      return null
    }

    const collectionIds = collections.map((collection) => collection.id)

    await Promise.all(
      collectionIds.map((id) =>
        getProductsList({
          queryParams: { collection_id: [id] },
          countryCode,
        })
      )
    ).then((responses) =>
      responses.forEach(({ response, queryParams }) => {
        let collection

        if (collections) {
          collection = collections.find(
            (collection) => collection.id === queryParams?.collection_id?.[0]
          )
        }

        if (!collection) {
          return
        }

        collection.products = response.products as unknown as Product[]
      })
    )

    return collections as unknown as ProductCollectionWithPreviews[]
  }
)

export default async function Home({
  params: { countryCode },
}: {
  params: { countryCode: string }
}) {
  const collections = await getCollectionsWithProducts(countryCode)
  const region = await getRegion(countryCode)

  if (!collections || !region) {
    return null
  }
  const collectionsAll = await getCollectionsList()

  return (
    <div className="flex w-full flex-col">
      <HeroSection
        className="-order-1 md:-order-2"
        title="Spring into Savings! Up to 60% Off"
      />
      <ShopByCategory collections={collectionsAll.collections} />
      <FeaturedProducts collections={collections} region={region} />
    </div>
  )
}
