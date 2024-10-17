"use client"
import { cn } from "@lib/util/cn"
import { Button } from "@modules/layout/components/ui/button"
import Spinner from "@modules/common/icons/spinner"
import { HeartIcon } from "lucide-react"
import { useState, useTransition } from "react"

export function FavoriteButton() {
  const [isActive, setIsActive] = useState<boolean>(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isPending, startTransition] = useTransition()
  const handleClick = async () => {
    setIsAnimating(true)

    setIsActive(true)
  }

  return (
    <Button
      aria-label="Favorite this item"
      type="submit"
      onClick={handleClick}
      variant="outline"
      className="group w-full bg-white transition-all hover:scale-105"
    >
      {isPending ? (
        <div className="flex items-center justify-center">
          <Spinner className="size-4 bg-transparent" />
        </div>
      ) : (
        <>
          Favorite
          <HeartIcon
            onAnimationEnd={() => {
              console.log("end")
              setIsAnimating(false)
            }}
            className={cn(
              "ml-2 size-5 transition-all",
              isActive ? "text-red-500 " : "text-black",
              isAnimating && "animate-single-bounce"
            )}
          />
        </>
      )}
    </Button>
  )
}
