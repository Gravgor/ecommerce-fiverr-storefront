import { Metadata } from "next"

import Nav from "@modules/layout/templates/nav"
import { Footer } from "@modules/layout/templates/footer"
import { CallToAction } from "@modules/layout/components/medusa-cta"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://localhost:8000"

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
}

export default async function PageLayout(props: { children: React.ReactNode, modal: any }) {
  return (
    <>
      <Nav />
      {props.children}
      <CallToAction />
      <Footer />
    </>
  )
}
