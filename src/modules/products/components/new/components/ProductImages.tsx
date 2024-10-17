"use client"

import { useEffect, useState } from "react"
import { CarouselApi } from "@modules/layout/components/ui/carousel"
import { CenterSection } from "./CenterSection"
import { cn } from "@lib/util/cn"
import { SideImages } from "./SideImages"

export const ProductImages = ({ images }:any) => {
  const [api, setApi] = useState<CarouselApi>()
  const [thumbsApi, setThumbsApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!api || !thumbsApi) {
      return
    }

    setCurrent(api.selectedScrollSnap())

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
      thumbsApi.scrollTo(api.selectedScrollSnap())
    })
  }, [api, thumbsApi])
  return (
    <>
      <CenterSection setApi={setApi} images={images} className={cn("md:col-span-6", images.length > 1 ? "md:col-start-2" : "md:col-start-1")} />
      {images.length > 1 && <SideImages setThumbsApi={setThumbsApi} current={current} api={api} images={images} className="md:-order-1 md:col-span-1" />}
    </>
  )
}
