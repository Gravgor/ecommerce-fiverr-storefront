import Link from "next/link"
import { Search, Heart, ShoppingBag, User } from "lucide-react"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Button } from "@modules/layout/components/ui/button"
import { getCart, getCollectionsList } from "@lib/data"
import { cookies } from "next/headers"

export default async function Navbar() {
  const collections = await getCollectionsList()
  const cartId = cookies().get("_medusa_cart_id")?.value
  if (!cartId) {
    return (
      <header className="sticky top-0 z-40 w-full bg-gradient-to-r from-white to-gray-50 border-b-2 border-black">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <LocalizedClientLink
              href="/"
              className="flex items-center space-x-2"
            >
              <span className="text-2xl font-extrabold text-gray-900">
                Test shop
              </span>
            </LocalizedClientLink>
          </div>

          <nav className="hidden md:flex space-x-8">
            {collections.collections.map((category) => (
              <Link
                key={category.title}
                href={`/collections/${category.handle}`}
                className="text-sm font-medium text-gray-700 hover:text-black transition-colors duration-200"
              >
                {category.title}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <LocalizedClientLink href="/account">
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-700 hover:text-black transition-colors duration-200"
              >
                <User className="h-5 w-5" />
                <span className="sr-only">Account</span>
              </Button>
            </LocalizedClientLink>

            <LocalizedClientLink href="/wishlist">
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-700 hover:text-black transition-colors duration-200"
              >
                <Heart className="h-5 w-5" />
                <span className="sr-only">Wishlist</span>
              </Button>
            </LocalizedClientLink>

            <LocalizedClientLink href="/cart">
              <Button
                variant="ghost"
                size="icon"
                className="relative text-gray-700 hover:text-black transition-colors duration-200"
              >
                <ShoppingBag className="h-5 w-5" />
                <span className="sr-only">Cart</span>
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-black text-xs text-white flex items-center justify-center">
                  0
                </span>
              </Button>
            </LocalizedClientLink>
          </div>
        </div>
      </div>
    </header>
    )
  }
  const cart = await getCart(cartId)
  const cartItemsLength = cart?.items.length
  return (
    <header className="sticky top-0 z-40 w-full bg-gradient-to-r from-white to-gray-50 border-b-2 border-black">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <LocalizedClientLink
              href="/"
              className="flex items-center space-x-2"
            >
              <span className="text-2xl font-extrabold text-gray-900">
                Test shop
              </span>
            </LocalizedClientLink>
          </div>

          <nav className="hidden md:flex space-x-8">
            {collections.collections.map((category) => (
              <Link
                key={category.title}
                href={`/collections/${category.handle}`}
                className="text-sm font-medium text-gray-700 hover:text-black transition-colors duration-200"
              >
                {category.title}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <LocalizedClientLink href="/account">
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-700 hover:text-black transition-colors duration-200"
              >
                <User className="h-5 w-5" />
                <span className="sr-only">Account</span>
              </Button>
            </LocalizedClientLink>

            <LocalizedClientLink href="/wishlist">
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-700 hover:text-black transition-colors duration-200"
              >
                <Heart className="h-5 w-5" />
                <span className="sr-only">Wishlist</span>
              </Button>
            </LocalizedClientLink>

            <LocalizedClientLink href="/cart">
              <Button
                variant="ghost"
                size="icon"
                className="relative text-gray-700 hover:text-black transition-colors duration-200"
              >
                <ShoppingBag className="h-5 w-5" />
                <span className="sr-only">Cart</span>
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-black text-xs text-white flex items-center justify-center">
                  {cartItemsLength}
                </span>
              </Button>
            </LocalizedClientLink>
          </div>
        </div>
      </div>
    </header>
  )
}
