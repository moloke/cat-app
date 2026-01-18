import axios from 'axios'
import type { CatImage, Favourite, Vote, UploadResponse } from '../types'

const getOrCreateSubId = (): string => {
  const STORAGE_KEY = 'cat-app-sub-id'
  let subId = localStorage.getItem(STORAGE_KEY)
  
  if (!subId) {
    subId = 'cat-app-user-' + crypto.randomUUID()
    localStorage.setItem(STORAGE_KEY, subId)
  }
  
  return subId
}

const SUB_ID = getOrCreateSubId()

const apiClient = axios.create({
  baseURL: 'https://api.thecatapi.com/v1',
  headers: {
    'x-api-key': import.meta.env.VITE_CAT_API_KEY || '',
  },
})

// Fetch uploaded images
export const fetchImages = async (limit = 20): Promise<CatImage[]> => {
  const response = await apiClient.get<CatImage[]>('/images', {
    params: {
      sub_id: SUB_ID,
      limit,
      order: 'DESC',
    },
  })
  return response.data
}

// Upload a new image
export const uploadImage = async (file: File): Promise<UploadResponse> => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('sub_id', SUB_ID)

  const response = await apiClient.post<UploadResponse>('/images/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data
}

// Fetch all favourites
export const fetchFavourites = async (): Promise<Favourite[]> => {
  const response = await apiClient.get<Favourite[]>('/favourites', {
    params: {
      sub_id: SUB_ID,
    },
  })
  return response.data
}

// Create a favourite
export const createFavourite = async (imageId: string): Promise<Favourite> => {
  const response = await apiClient.post<{ id: number; message: string }>('/favourites', {
    image_id: imageId,
    sub_id: SUB_ID,
  })
  
  return {
    id: response.data.id,
    image_id: imageId,
    sub_id: SUB_ID,
    created_at: new Date().toISOString(),
  }
}

// Delete a favourite
export const deleteFavourite = async (favouriteId: number): Promise<void> => {
  await apiClient.delete(`/favourites/${favouriteId}`)
}

// Fetch all votes
export const fetchVotes = async (): Promise<Vote[]> => {
  const response = await apiClient.get<Vote[]>('/votes', {
    params: {
      sub_id: SUB_ID,
    },
  })
  return response.data
}

// Create a vote 
export const createVote = async (imageId: string, value: number): Promise<Vote> => {
  const response = await apiClient.post<{ id: number; message: string }>('/votes', {
    image_id: imageId,
    value,
    sub_id: SUB_ID,
  })

  return {
    id: response.data.id,
    image_id: imageId,
    sub_id: SUB_ID,
    value,
    created_at: new Date().toISOString(),
  }
}

export { SUB_ID }