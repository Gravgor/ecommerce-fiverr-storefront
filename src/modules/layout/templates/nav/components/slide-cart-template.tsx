"use client"

import { CartWithCheckoutStep } from "types/global"
import { Button } from "@modules/layout/components/ui/button"
import { Customer } from "@medusajs/medusa"
import { Minus, Plus, ShoppingBag, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Image from "next/image"

export default function SlideCartTemplate({
  cart,
  customer,
  isOpen,
}: {
  cart: CartWithCheckoutStep | null
  customer: Omit<Customer, "password_hash"> | null
  isOpen: boolean
}) {
  const [initialCart, setInitialCart] = useState(cart)
  const [open, setOpen] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setOpen(true)
  }, [])

  useEffect(() => {
    if (open) {
      setIsAnimating(true)
      const timer = setTimeout(() => setIsAnimating(false), 300)
      return () => clearTimeout(timer)
    }
  }, [open])

  const handleClose = () => {
    setOpen(false)
    setIsAnimating(true)
    setTimeout(() => {
      router.back()
    }, 300)
  }

  return (
    <div
      className={`fixed inset-y-0 right-0 w-full sm:w-96 bg-white shadow-lg transform transition-all duration-300 ease-in-out z-50 ${
        open ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      } ${isAnimating ? "pointer-events-none" : ""}`}
    >
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">My Cart</h2>
          <Button variant="ghost" size="icon" onClick={handleClose}>
            <X className="h-6 w-6" />
          </Button>
        </div>
        <div className="flex-grow overflow-y-auto p-4">
          {initialCart && initialCart.items.length > 0 ? (
            initialCart.items.map((item) => (
              <div key={item.id} className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center">
                  {item.thumbnail ? (
                    <Image
                      src={item.thumbnail}
                      alt={item.title}
                      width={64}
                      height={64}
                      className="rounded-md"
                    />
                  ) : (
                    <ShoppingBag className="h-8 w-8 text-gray-500" />
                  )}
                </div>
                <div className="flex-grow">
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">
                    {(item.unit_price / 100).toFixed(2)} USD
                  </p>
                  <div className="flex items-center mt-2">
                    <Button variant="outline" size="icon">
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="mx-2">{item.quantity}</span>
                    <Button variant="outline" size="icon">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <ShoppingBag className="h-16 w-16 text-gray-400 mb-4" />
              <p className="text-xl font-semibold text-gray-700">Your cart is empty</p>
              <p className="text-gray-500 mt-2">Add some items to your cart to get started!</p>
            </div>
          )}
        </div>
        <div className="border-t p-4">
          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span className="font-semibold">
              {initialCart?.subtotal !== undefined
                ? (initialCart.subtotal / 100).toFixed(2)
                : "0.00"}{" "}
              USD
            </span>
          </div>
          <div className="flex justify-between mb-4">
            <span className="font-semibold">Total</span>
            <span className="font-semibold">
              {initialCart?.total !== undefined
                ? (initialCart.total / 100).toFixed(2)
                : "0.00"}{" "}
              USD
            </span>
          </div>
          <Button 
            className="w-full bg-black text-white" 
            size="lg"
            disabled={!initialCart || initialCart.items.length === 0}
          >
            Proceed to Checkout
          </Button>
        </div>
      </div>
    </div>
  )
}