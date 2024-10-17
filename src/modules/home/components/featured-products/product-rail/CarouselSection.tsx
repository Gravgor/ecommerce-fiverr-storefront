import { cn } from "@lib/util/cn"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@modules/layout/components/ui/carousel"
import { Skeleton } from "@modules/layout/components/ui/skeleton"
import ProductPreview from "@modules/products/components/product-preview"
import { ProductPreviewType } from "types/global"

interface CarouselSectionProps {
  title: string
  items: ProductPreviewType[]
  className?: string
  region: any
}

export function CarouselSection({ items, title, className, region }: CarouselSectionProps) {
  return (
    <Carousel opts={{ skipSnaps: true }}>
      <div className={cn("max-w-container-md container mx-auto flex flex-col gap-4", className)}>
        <div className="flex justify-between sm:min-w-[280px]">
          <h2 className="px-4 text-left text-4xl font-thin tracking-tighter">{title}</h2>
          <div className="hidden gap-4 md:flex">
            <CarouselPrevious className="relative" />
            <CarouselNext className="relative" />
          </div>
        </div>
        <CarouselContent>
          {items.map((product: any, idx: any) => (
            <CarouselItem key={"relevant_" + product.id + idx} className="basis-1/2 md:basis-1/4">
              <ProductPreview region={region} productPreview={product} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </div>
    </Carousel>
  )
}

export function CarouselSectionSkeleton() {
  return (
    <div className="max-w-container-md mx-auto flex flex-col gap-16 px-4 py-20 md:pb-32 md:pt-24 xl:px-0">
      <div className="basis-1/3 text-center text-5xl font-normal tracking-tighter sm:min-w-[280px] md:text-left md:text-6xl">
        <Skeleton className="h-[60px] w-[280px]" />
      </div>
      <div className="w-full">
        <Carousel opts={{ containScroll: "keepSnaps", dragFree: true }}>
          <CarouselContent className="ml-0 justify-start gap-8">
            {Array.from({ length: 8 }, (_, idx) => (
              <Skeleton className="h-[430px] min-w-[280px] max-w-[280px]" key={idx} />
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  )
}
