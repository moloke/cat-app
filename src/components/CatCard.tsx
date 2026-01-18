import { useState } from 'react'
import { FaHeart, FaRegHeart, FaChevronUp, FaChevronDown } from 'react-icons/fa'
import type { CatCardData } from '../types'

interface CatCardProps {
  cat: CatCardData
  onToggleFavourite: (imageId: string, isFavourited: boolean, favouriteId?: number) => void
  onVote: (imageId: string, value: number) => void
}

function CatCard({ cat, onToggleFavourite, onVote }: CatCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false)

  const handleFavouriteClick = () => {
    onToggleFavourite(cat.id, cat.isFavourited, cat.favouriteId)
  }

  const handleUpvote = () => {
    onVote(cat.id, 1)
  }

  const handleDownvote = () => {
    onVote(cat.id, -1)
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative w-full h-64 bg-gray-200">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        )}
        <img
          src={cat.url}
          alt="Cat"
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
        />
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-600">Score:</span>
            <span
              className={`text-lg font-bold ${
                cat.score > 0
                  ? 'text-green-600'
                  : cat.score < 0
                  ? 'text-red-600'
                  : 'text-gray-600'
              }`}
            >
              {cat.score > 0 ? '+' : ''}
              {cat.score}
            </span>
            <span className="text-xs text-gray-500">
              ({cat.upvotes} 👍 / {cat.downvotes} 👎)
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={handleFavouriteClick}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all cursor-pointer ${
              cat.isFavourited
                ? 'bg-red-100 text-red-600 hover:bg-red-200'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            aria-label={cat.isFavourited ? 'Remove from favourites' : 'Add to favourites'}
          >
            {cat.isFavourited ? (
              <>
                <FaHeart className="text-lg" />
                <span className="hidden sm:inline">Favourited</span>
              </>
            ) : (
              <>
                <FaRegHeart className="text-lg" />
                <span className="hidden sm:inline">Favourite</span>
              </>
            )}
          </button>

          <div className="flex space-x-2">
            <button
              onClick={handleUpvote}
              className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors cursor-pointer"
              aria-label="Vote up"
            >
              <FaChevronUp className="text-xl" />
            </button>
            <button
              onClick={handleDownvote}
              className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors cursor-pointer"
              aria-label="Vote down"
            >
              <FaChevronDown className="text-xl" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CatCard