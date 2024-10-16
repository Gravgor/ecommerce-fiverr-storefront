import { Container } from "@medusajs/ui"

const SkeletonProductPreview = () => {
  return (
    <div className="animate-pulse">
      <div className="aspect-square w-full bg-gray-200 rounded-lg mb-4" />
      <div className="space-y-2">
        <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
        <div className="w-1/2 h-4 bg-gray-200 rounded"></div>
        <div className="flex items-center space-x-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-4 h-4 bg-gray-200 rounded-full" />
          ))}
          <div className="w-16 h-4 bg-gray-200 rounded ml-1"></div>
        </div>
        <div className="flex justify-between items-center">
          <div className="w-1/3 h-5 bg-gray-200 rounded"></div>
          <div className="w-1/4 h-4 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  )
}

export default SkeletonProductPreview