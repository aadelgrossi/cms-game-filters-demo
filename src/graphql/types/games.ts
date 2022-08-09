import { ContentType } from './shared'

export interface GamePlatform {
  name: string
}

export interface Genre {
  name: string
}

export interface Game {
  id: string
  name: string
  subtitle: string
  featured: boolean
  freeToPlay: boolean
  releaseDate: Date
  platforms: ContentType<GamePlatform>[]
  genres: ContentType<Genre>[]
}

export interface GamesResponse {
  games: ContentType<Game>[]
}

export interface GamesVariables {
  keywords?: string
  freeToPlay?: boolean
  featured?: boolean
  genres?: string[]
}
