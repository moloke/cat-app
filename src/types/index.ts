// API Response Types from TheCatAPI

export interface CatImage {
  id: string;
  url: string;
  width: number;
  height: number;
  sub_id?: string;
  created_at?: string;
  original_filename?: string;
}

export interface Favourite {
  id: number;
  image_id: string;
  sub_id: string;
  created_at: string;
}

export interface Vote {
  id: number;
  image_id: string;
  sub_id: string;
  value: number; 
  created_at: string;
}

// Enhanced type for UI rendering with merged data
export interface CatCardData extends CatImage {
  isFavourited: boolean;
  favouriteId?: number;
  score: number;
  upvotes: number;
  downvotes: number;
}

// API Error Response
export interface ApiError {
  message: string;
  status?: number;
  level?: string;
}

// Upload Response
export interface UploadResponse {
  id: string;
  url: string;
  width: number;
  height: number;
  original_filename: string;
  pending: number;
  approved: number;
}