import { Metadata } from "next"

import { getCustomer, listCustomerOrders } from "@lib/data"
import { notFound } from "next/navigation"
import AccountManagement from "@modules/account/components/overview"

export const metadata: Metadata = {
  title: "Account",
  description: "Overview of your account activity.",
}

export default async function OverviewTemplate() {
  const customer = await getCustomer().catch(() => null)
  const orders = (await listCustomerOrders().catch(() => null)) || null

  if (!customer) {
    notFound()
  }

  return <AccountManagement customer={customer} orders={orders} />
}
