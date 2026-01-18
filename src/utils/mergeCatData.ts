import type { CatImage, Favourite, Vote, CatCardData } from '../types'

/**
 * Merges images with their favourite and vote data for efficient UI rendering
 */
export function mergeCatData(
  images: CatImage[],
  favourites: Favourite[],
  votes: Vote[]
): CatCardData[] {
    // map of image_id to favourite_id
  const favouritesMap = new Map<string, number>()
  favourites.forEach((fav) => {
    favouritesMap.set(fav.image_id, fav.id)
  })

  // map of image_id to vote counts
  const votesMap = new Map<string, { upvotes: number; downvotes: number }>()
  votes.forEach((vote) => {
    const current = votesMap.get(vote.image_id) || { upvotes: 0, downvotes: 0 }
    if (vote.value === 1) {
      current.upvotes++
    } else {
      current.downvotes++
    }
    votesMap.set(vote.image_id, current)
  })

  return images.map((image) => {
    const voteData = votesMap.get(image.id) || { upvotes: 0, downvotes: 0 }
    const isFavourited = favouritesMap.has(image.id)
    const favouriteId = favouritesMap.get(image.id)

    return {
      ...image,
      isFavourited,
      favouriteId,
      upvotes: voteData.upvotes,
      downvotes: voteData.downvotes,
      score: voteData.upvotes - voteData.downvotes,
    }
  })
}