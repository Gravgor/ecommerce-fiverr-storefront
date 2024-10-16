"use client"

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { ProductCollection } from '@medusajs/product'
import LocalizedClientLink from '@modules/common/components/localized-client-link'

export default function ShopByCategory({
    collections
}: any) {
  const categories = useState<any>(collections)
  const containerRef = useRef(null)

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  }
  console.log(categories)

  return (
    <section className="w-full py-20 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-black">
          Explore Categories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories[0].map((category: any, index: any) => (
            <motion.div
              key={category.handle}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <LocalizedClientLink
                href={`/collections/${category.handle}`}
                className="group block relative overflow-hidden aspect-[4/3] rounded-2xl bg-gray-100 transition-all duration-300 hover:shadow-xl"
              >
                <div className={`absolute inset-0 ${getCategoryShape(index)} transition-all duration-300 group-hover:scale-110`} />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
                <div className="relative z-10 h-full flex flex-col justify-between p-6">
                  <h3 className="text-2xl font-semibold text-black group-hover:text-white transition-colors duration-300">
                    {category.title}
                  </h3>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="inline-block py-2 px-4 bg-white text-black text-sm font-medium rounded-full">
                      Explore
                    </span>
                  </div>
                </div>
              </LocalizedClientLink>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function getCategoryShape(index: number) {
  const shapes = [
    'bg-purple-500/30 [clip-path:polygon(30%_0%,70%_0%,100%_30%,100%_70%,70%_100%,30%_100%,0%_70%,0%_30%)]',
    'bg-pink-500/30 rounded-full',
    'bg-red-500/30 [clip-path:polygon(50%_0%,100%_50%,50%_100%,0%_50%)]',
    'bg-orange-500/30 [clip-path:polygon(0_0,100%_0,100%_75%,75%_100%,0_100%)]',
    'bg-yellow-500/30 [clip-path:circle(50%_at_50%_50%)]',
    'bg-green-500/30 [clip-path:polygon(20%_0%,80%_0%,100%_20%,100%_80%,80%_100%,20%_100%,0%_80%,0%_20%)]',
  ]
  return shapes[index % shapes.length]
}