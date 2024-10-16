import { getCart, getCustomer } from "@lib/data"
import { cookies } from "next/headers"
import { getCheckoutStep } from "@lib/util/get-checkout-step"
import { LineItem } from "@medusajs/medusa"
import { enrichLineItems } from "@modules/cart/actions"
import { CartWithCheckoutStep } from "types/global"
import { Metadata } from "next"
import SlideCartTemplate from "./slide-cart-template"

export const metadata: Metadata = {
  title: "Cart",
  description: "View your cart",
}


async function getFullCart () {
  const cartId = cookies().get("_medusa_cart_id")?.value
  if (!cartId) {
    return null
  }
  const cart = await getCart(cartId).then((cart) => cart as CartWithCheckoutStep)

  if(!cart) {
    return null
  }

  if(cart?.items.length) {
      const enrichedItems = await enrichLineItems(cart?.items, cart?.region_id)
      cart.items = enrichedItems as LineItem[]
  }
  cart.checkout_step = cart && getCheckoutStep(cart)
  return cart
}

export default async function SlideOutCart() {
  const cart = await getFullCart()
  const customer = await getCustomer()
  const isOpen = true
  return <SlideCartTemplate cart={cart} customer={customer} isOpen={isOpen}/>
}
