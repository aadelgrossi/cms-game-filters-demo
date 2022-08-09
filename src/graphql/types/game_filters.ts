import { MultiContentType } from './shared'

interface GameFilter {
  slug: string
  query: string
}

export interface GameFilterResponse {
  gamesFilters: MultiContentType<GameFilter>
}

export interface GameFilterVariables {
  slug: string
}
