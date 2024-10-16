import { Search, Heart, ShoppingBag, User, Menu } from "lucide-react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

import { Input } from "@modules/layout/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@modules/layout/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@modules/layout/components/ui/sheet"
import { getCollectionsList, getCart } from "@lib/data"
import { cookies } from "next/headers"
import { Button } from "@modules/layout/components/ui/button"

export default async function Navbar() {
  const collections = await getCollectionsList()
  const cartId = cookies().get("_medusa_cart_id")?.value
  let cart = null
  let cartItemsCount = 0

  if (cartId) {
    cart = await getCart(cartId)
    cartItemsCount = cart?.items.length || 0
  }

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <LocalizedClientLink href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-extrabold text-gray-900">Test shop</span>
            </LocalizedClientLink>
          </div>

          <nav className="hidden lg:flex space-x-8">
            {collections.collections.map((category) => (
              <LocalizedClientLink
                key={category.handle}
                href={`/collections/${category.handle}`}
                className="text-sm font-medium text-gray-700 hover:text-black transition-colors duration-200"
              >
                {category.title}
              </LocalizedClientLink>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <form className="hidden md:block">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="pl-8 pr-4 py-2 w-full md:w-[200px] lg:w-[300px]"
                />
              </div>
            </form>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <User className="h-5 w-5" />
                  <span className="sr-only">Account</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <LocalizedClientLink href="/account">My Account</LocalizedClientLink>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LocalizedClientLink href="/orders">Orders</LocalizedClientLink>
                </DropdownMenuItem>
                <DropdownMenuItem>Sign out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <LocalizedClientLink href="/wishlist">
              <Button variant="ghost" size="icon" className="relative">
                <Heart className="h-5 w-5" />
                <span className="sr-only">Wishlist</span>
              </Button>
            </LocalizedClientLink>

            <LocalizedClientLink href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingBag className="h-5 w-5" />
                <span className="sr-only">Cart</span>
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-black text-xs text-white flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </Button>
            </LocalizedClientLink>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="flex flex-col space-y-4">
                  {collections.collections.map((category) => (
                    <LocalizedClientLink
                      key={category.handle}
                      href={`/collections/${category.handle}`}
                      className="text-sm font-medium text-gray-700 hover:text-black transition-colors duration-200"
                    >
                      {category.title}
                    </LocalizedClientLink>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}