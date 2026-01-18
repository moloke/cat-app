function SkeletonLoader() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      <div className="w-full h-64 bg-gray-300"/>
      
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-300 rounded w-20"/>
        
        <div className="flex items-center justify-between">
          <div className="h-8 bg-gray-300 rounded w-24"/>
          <div className="flex space-x-2">
            <div className="h-8 w-8 bg-gray-300 rounded"/>
            <div className="h-8 w-8 bg-gray-300 rounded"/>
          </div>
        </div>
      </div>
    </div>
  )
}

export function SkeletonGrid({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonLoader key={index}/>
      ))}
    </div>
  )
}

export default SkeletonLoader