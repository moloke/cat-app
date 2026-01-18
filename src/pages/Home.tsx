import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import CatCard from '../components/CatCard'
import { SkeletonGrid } from '../components/SkeletonLoader'
import EmptyState from '../components/EmptyState'
import {
  fetchImages,
  fetchFavourites,
  fetchVotes,
  createFavourite,
  deleteFavourite,
} from '../services/catApi'
import { mergeCatData } from '../utils/mergeCatData'
import type { CatCardData } from '../types'

function Home() {
  const queryClient = useQueryClient()

  const { data: images = [], isLoading: imagesLoading } = useQuery({
    queryKey: ['images'],
    queryFn: () => fetchImages(20),
  })

  const { data: favourites = [], isLoading: favouritesLoading } = useQuery({
    queryKey: ['favourites'],
    queryFn: () => fetchFavourites(),
  })

  const { data: votes = [], isLoading: votesLoading } = useQuery({
    queryKey: ['votes'],
    queryFn: () => fetchVotes(),
  })

  const cats: CatCardData[] = mergeCatData(images, favourites, votes)

  const favouriteMutation = useMutation({
    mutationFn: async ({
      imageId,
      isFavourited,
      favouriteId,
    }: {
      imageId: string;
      isFavourited: boolean;
      favouriteId?: number;
    }) => {
      if (isFavourited && favouriteId) {
        await deleteFavourite(favouriteId)
        return { action: 'removed' }
      } else {
        await createFavourite(imageId)
        return { action: 'added' }
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['favourites'] })
      toast.success(
        data.action === 'added' ? 'Added to favourites! ❤️' : 'Removed from favourites'
      )
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to update favourite'
      toast.error(message)
    },
  })

  const handleToggleFavourite = (
    imageId: string,
    isFavourited: boolean,
    favouriteId?: number
  ) => {
    favouriteMutation.mutate({ imageId, isFavourited, favouriteId })
  }

  const handleVote = (imageId: string, value: number) => {
    console.log('Vote:', { imageId, value })
  }

  const isLoading = imagesLoading || favouritesLoading || votesLoading

  if (isLoading) {
    return (
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Cat Gallery</h1>
        <SkeletonGrid count={8} />
      </div>
    )
  }

  if (cats.length === 0) {
    return (
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Cat Gallery</h1>
        <EmptyState />
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Cat Gallery</h1>
        <p className="text-gray-600">
          {cats.length} {cats.length === 1 ? 'cat' : 'cats'} in your collection
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {cats.map((cat) => (
          <CatCard
            key={cat.id}
            cat={cat}
            onToggleFavourite={handleToggleFavourite}
            onVote={handleVote}
          />
        ))}
      </div>
    </div>
  )
}

export default Home