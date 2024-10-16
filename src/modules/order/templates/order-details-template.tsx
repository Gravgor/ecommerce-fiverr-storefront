"use client"

import React from "react"
import { Order } from "@medusajs/medusa"
import { ArrowLeft } from "lucide-react"
import { Button } from "@modules/layout/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@modules/layout/components/ui/card"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import OrderDetails from "@modules/order/components/order-details"
import Items from "@modules/order/components/items"
import ShippingDetails from "@modules/order/components/shipping-details"
import OrderSummary from "@modules/order/components/order-summary"

type OrderDetailsTemplateProps = {
  order: Order
}

const OrderDetailsTemplate: React.FC<OrderDetailsTemplateProps> = ({ order }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Order Details</h1>
        <LocalizedClientLink
          href="/account/orders"
          className="flex items-center text-sm text-gray-600 hover:text-gray-900"
          data-testid="back-to-overview-button"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to overview
        </LocalizedClientLink>
      </div>

      <div className="grid gap-6 md:grid-cols-3" data-testid="order-details-container">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Order Information</CardTitle>
          </CardHeader>
          <CardContent>
            <OrderDetails order={order} showStatus />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <OrderSummary order={order} />
          </CardContent>
        </Card>

        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Items</CardTitle>
          </CardHeader>
          <CardContent>
            <Items items={order.items} region={order.region} />
          </CardContent>
        </Card>

        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Shipping Details</CardTitle>
          </CardHeader>
          <CardContent>
            <ShippingDetails order={order} />
          </CardContent>
        </Card>

        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Need Help?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              If you have any questions about your order, please contact our customer support.
            </p>
            <Button variant="outline">Contact Support</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default OrderDetailsTemplate