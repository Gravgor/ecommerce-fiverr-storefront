"use client"

import { useRef, useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@modules/layout/components/ui/button"

export default function ProductRailWrapper({
  children,
  title,
  totalProducts
}: {
  children: React.ReactNode
  title: string
  totalProducts: number
}) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    setShowRightArrow(isMobile ? totalProducts > 1 : totalProducts > 4)
  }, [totalProducts, isMobile])

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { current } = scrollRef
      const itemWidth = isMobile ? current.clientWidth : current.clientWidth / 4
      const maxIndex = isMobile ? totalProducts - 1 : totalProducts - 4
      const newIndex = direction === "left" 
        ? Math.max(currentIndex - (isMobile ? 1 : 4), 0) 
        : Math.min(currentIndex + (isMobile ? 1 : 4), maxIndex)
      
      current.style.transform = `translateX(-${newIndex * itemWidth}px)`
      setCurrentIndex(newIndex)
      setShowLeftArrow(newIndex > 0)
      setShowRightArrow(newIndex < maxIndex)
    }
  }

  return (
    <div className="bg-white py-8 md:py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{title}</h2>
          {totalProducts > (isMobile ? 1 : 4) && (
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="icon"
                className={`rounded-full bg-gray-200 hover:bg-gray-300 ${!showLeftArrow && 'opacity-50 cursor-not-allowed'}`}
                onClick={() => scroll("left")}
                disabled={!showLeftArrow}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className={`rounded-full bg-black text-white hover:bg-gray-800 ${!showRightArrow && 'opacity-50 cursor-not-allowed'}`}
                onClick={() => scroll("right")}
                disabled={!showRightArrow}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
        <div className="overflow-hidden">
          <div
            ref={scrollRef}
            className="flex transition-transform duration-300 ease-in-out"
            style={{ width: isMobile ? `${totalProducts * 100}%` : `${Math.max(totalProducts * 25, 100)}%` }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}