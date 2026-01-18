import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CatCard from '../CatCard'
import type { CatCardData } from '../../types'

describe('CatCard', () => {
  const mockCat: CatCardData = {
    id: 'test-cat-1',
    url: 'https://example.com/cat.jpg',
    width: 800,
    height: 600,
    isFavourited: false,
    upvotes: 5,
    downvotes: 2,
    score: 3,
  }

  const mockHandlers = {
    onToggleFavourite: vi.fn(),
    onVote: vi.fn(),
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders cat image correctly', () => {
    render(<CatCard cat={mockCat} {...mockHandlers} />)
    
    const image = screen.getByRole('img', { name: /cat/i })
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', mockCat.url)
  })

  it('displays correct score calculation', () => {
    render(<CatCard cat={mockCat} {...mockHandlers} />)
    
    // Score should be +3 (5 upvotes - 2 downvotes)
    expect(screen.getByText(/\+3/)).toBeInTheDocument()
    expect(screen.getByText(/5.*👍/)).toBeInTheDocument()
    expect(screen.getByText(/2.*👎/)).toBeInTheDocument()
  })

  it('displays negative score correctly', () => {
    const catWithNegativeScore: CatCardData = {
      ...mockCat,
      upvotes: 2,
      downvotes: 5,
      score: -3,
    }

    render(<CatCard cat={catWithNegativeScore} {...mockHandlers} />)
    
    expect(screen.getByText('-3')).toBeInTheDocument()
  })

  it('displays zero score correctly', () => {
    const catWithZeroScore: CatCardData = {
      ...mockCat,
      upvotes: 3,
      downvotes: 3,
      score: 0,
    }

    render(<CatCard cat={catWithZeroScore} {...mockHandlers} />)
    
    expect(screen.getByText('0')).toBeInTheDocument()
  })

  it('shows unfilled heart when not favourited', () => {
    render(<CatCard cat={mockCat} {...mockHandlers} />)
    
    const favouriteButton = screen.getByRole('button', { 
      name: /add to favourites/i 
    })
    expect(favouriteButton).toBeInTheDocument()
  })

  it('shows filled heart when favourited', () => {
    const favouritedCat: CatCardData = {
      ...mockCat,
      isFavourited: true,
      favouriteId: 123,
    }

    render(<CatCard cat={favouritedCat} {...mockHandlers} />)
    
    const favouriteButton = screen.getByRole('button', { 
      name: /remove from favourites/i 
    })
    expect(favouriteButton).toBeInTheDocument()
  })

  it('calls onToggleFavourite when heart button is clicked', async () => {
    const user = userEvent.setup()
    render(<CatCard cat={mockCat} {...mockHandlers} />)
    
    const favouriteButton = screen.getByRole('button', { 
      name: /add to favourites/i 
    })
    
    await user.click(favouriteButton)
    
    expect(mockHandlers.onToggleFavourite).toHaveBeenCalledWith(
      mockCat.id,
      mockCat.isFavourited,
      mockCat.favouriteId
    )
    expect(mockHandlers.onToggleFavourite).toHaveBeenCalledTimes(1)
  })

  it('calls onVote with value 1 when upvote button is clicked', async () => {
    const user = userEvent.setup()
    render(<CatCard cat={mockCat} {...mockHandlers} />)
    
    const upvoteButton = screen.getByRole('button', { name: /vote up/i })
    
    await user.click(upvoteButton)
    
    expect(mockHandlers.onVote).toHaveBeenCalledWith(mockCat.id, 1)
    expect(mockHandlers.onVote).toHaveBeenCalledTimes(1)
  })

  it('calls onVote with value -1 when downvote button is clicked', async () => {
    const user = userEvent.setup()
    render(<CatCard cat={mockCat} {...mockHandlers} />)
    
    const downvoteButton = screen.getByRole('button', { name: /vote down/i })
    
    await user.click(downvoteButton)
    
    expect(mockHandlers.onVote).toHaveBeenCalledWith(mockCat.id, -1)
    expect(mockHandlers.onVote).toHaveBeenCalledTimes(1)
  })

  it('displays vote and favourite buttons', () => {
    render(<CatCard cat={mockCat} {...mockHandlers} />)
    
    expect(screen.getByRole('button', { name: /vote up/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /vote down/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /favourite/i })).toBeInTheDocument()
  })
})