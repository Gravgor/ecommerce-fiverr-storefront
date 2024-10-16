'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@modules/layout/components/ui/button'

type ImageGalleryProps = {
  images: { id: string; url: string }[]
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : images.length - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex < images.length - 1 ? prevIndex + 1 : 0))
  }

  return (
    <div className="flex gap-4 max-w-4xl mx-auto p-4">
      <div className="w-20 flex flex-col gap-2 overflow-y-auto max-h-[600px]">
        {images.map((image, index) => (
          <div
            key={image.id}
            className={`relative w-20 h-20 cursor-pointer ${
              index === currentIndex ? 'border-2 border-primary' : ''
            }`}
            onClick={() => setCurrentIndex(index)}
          >
            <Image
              src={image.url}
              alt={`Thumbnail ${index + 1}`}
              fill
              className="object-cover rounded-md"
            />
          </div>
        ))}
      </div>
      <div className="flex-1 flex flex-col">
        <div className="relative aspect-square mb-4">
          <Image
            src={images[currentIndex].url}
            alt={`Product image ${currentIndex + 1}`}
            fill
            className="object-cover rounded-lg"
            priority
          />
        </div>
        <div className="flex justify-center gap-4">
          <Button variant="outline" size="icon" onClick={goToPrevious}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={goToNext}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}