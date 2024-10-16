'use client'

import { useState } from 'react'
import { Star, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react'
import { Button } from '@modules/layout/components/ui/button'
import { Card, CardContent } from '@modules/layout/components/ui/card'

type Review = {
  id: string
  author: string
  date: string
  rating: number
  content: string
}

type CustomerReviewsProps = {
  reviews: Review[]
  averageRating: number
}

export default function CustomerReviews({ reviews, averageRating }: CustomerReviewsProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [expandedReviews, setExpandedReviews] = useState<string[]>([])

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : reviews.length - 3))
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex < reviews.length - 3 ? prevIndex + 1 : 0))
  }

  const toggleExpand = (id: string) => {
    setExpandedReviews((prev) =>
      prev.includes(id) ? prev.filter((reviewId) => reviewId !== id) : [...prev, id]
    )
  }

  const visibleReviews = reviews.slice(currentIndex, currentIndex + 3)

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          Customer Reviews ({reviews.length})
          <span className="flex items-center">
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            {averageRating.toFixed(2)}
          </span>
        </h2>
        <Button variant="outline">Leave a Review</Button>
      </div>
      <div className="relative">
        <div className="flex gap-4 overflow-hidden">
          {visibleReviews.map((review) => (
            <Card key={review.id} className="flex-1 min-w-[250px]">
              <CardContent className="p-4">
                <h3 className="font-semibold">{review.author}</h3>
                <p className="text-sm text-gray-500 mb-2">{review.date}</p>
                <div className="flex mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm">
                  {expandedReviews.includes(review.id) || review.content.length <= 100
                    ? review.content
                    : `${review.content.slice(0, 100)}...`}
                </p>
                {review.content.length > 100 && (
                  <Button
                    variant="link"
                    className="p-0 h-auto text-sm"
                    onClick={() => toggleExpand(review.id)}
                  >
                    {expandedReviews.includes(review.id) ? 'Read less' : 'Read more'}
                    <ChevronDown className="w-4 h-4 ml-1" />
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
        <Button
          variant="outline"
          size="icon"
          className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2"
          onClick={goToPrevious}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2"
          onClick={goToNext}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="text-right mt-4">
        <Button variant="link" className="p-0 h-auto">
          See all reviews
        </Button>
      </div>
    </div>
  )
}