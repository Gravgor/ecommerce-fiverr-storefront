"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { Button } from "@modules/layout/components/ui/button"

interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  slug: string
}

interface HeroProps {
  featuredProducts: Product[]
}

export default function Hero({ featuredProducts }: HeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextProduct = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredProducts.length)
  }

  const prevProduct = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + featuredProducts.length) % featuredProducts.length)
  }

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      <div className="container mx-auto h-full flex items-center justify-between px-4 lg:px-8">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          transition={{ duration: 0.5 }}
          className="w-full lg:w-1/2 space-y-6"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
            Discover Our
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
              Latest Trends
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-md">
            Explore our curated collection of trendsetting products that define style and innovation.
          </p>
          <div className="flex items-center space-x-4">
            <Button
              variant="default"
              size="lg"
              className="bg-gray-900 text-white hover:bg-gray-800 transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              <a href={`/products/${featuredProducts[currentIndex].slug}`} className="flex items-center">
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <span className="text-gray-500 text-sm">
              Starting from ${featuredProducts[currentIndex].price.toFixed(2)}
            </span>
          </div>
        </motion.div>
        <div className="hidden lg:block w-1/2 relative h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Image
                src={featuredProducts[currentIndex].image}
                alt={featuredProducts[currentIndex].name}
                width={500}
                height={500}
                className="object-cover rounded-2xl shadow-2xl"
              />
            </motion.div>
          </AnimatePresence>
          <div className="absolute bottom-8 right-8 flex space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={prevProduct}
              className="bg-white/80 backdrop-blur-sm hover:bg-white/90"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextProduct}
              className="bg-white/80 backdrop-blur-sm hover:bg-white/90"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}