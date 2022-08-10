import { GameStatus } from '~/constants/gameStatusOptions'

import { Genre } from './genres'
import { MultiContentType, SingleContentType } from './shared'

interface GamePlatform {
  name: string
}

interface Asset {
  url: string
  width: number
  height: number
  placeholder: string
}

interface Review {
  rating: number
}
export interface Game {
  id: string
  createdAt: string
  name: string
  subtitle: string
  featured: boolean
  freeToPlay: boolean
  releaseDate: Date
  status: GameStatus
  logo: SingleContentType<Asset>
  platforms: GamePlatform[]
  review: SingleContentType<Review>
  genres: MultiContentType<Genre>
}

export interface GamesResponse {
  games: MultiContentType<Game>
}

export interface GamesVariables {
  keywords?: string
  freeToPlay?: boolean
  featured?: boolean
  genres?: string[]
  platforms?: string[]
  status?: GameStatus
  date?: string
  rating?: number
}
