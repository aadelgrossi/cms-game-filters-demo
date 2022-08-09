import { MultiContentType } from './shared'

export interface Genre {
  name: string
}

export interface GenresResponse {
  genres: MultiContentType<Genre>
}
