import { Genre } from './genres'
import { MultiContentType, SingleContentType } from './shared'

export interface GamePlatform {
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
  name: string
  subtitle: string
  featured: boolean
  freeToPlay: boolean
  releaseDate: Date
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
  date?: string
  rating?: number
}
