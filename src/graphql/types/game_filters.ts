import { ContentType } from './shared'

interface GameFilter {
  slug: string
  query: string
}

export interface GameFilterResponse {
  gamesFilters: ContentType<GameFilter>
}

export interface GameFilterVariables {
  slug: string
}
