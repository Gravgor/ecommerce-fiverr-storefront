import { cn } from "@lib/util/cn";
import { Button } from "@modules/layout/components/ui/button";

type ReviewsSectionProps = {
    productId: string | null | undefined;
    productHandle: string | null | undefined;
}

export const ReviewsSection = ({productId, productHandle}: ReviewsSectionProps) => {
    const reviews = []
    if (reviews.length <= 0) {
        <section className={cn("relative left-1/2 w-screen -translate-x-1/2 bg-gray-50 py-12 md:my-10")}>
        <div className="container mx-auto max-w-5xl px-4 md:px-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <h2 className="text-xl font-semibold sm:text-2xl">Have this product? Help others by sharing your experience</h2>
            <Button>
                Leave a review
            </Button>
          </div>
        </div>
      </section>
    }
    return (
        <section className={cn("container mx-auto w-screen bg-gray-50 py-12 md:my-10")}>
        <div className="container mx-auto max-w-5xl px-4 md:px-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <h2 className="text-xl font-semibold sm:text-2xl">Have this product? Help others by sharing your experience</h2>
            <Button>
                Leave a review
            </Button>
          </div>
        </div>
      </section>
    )
}