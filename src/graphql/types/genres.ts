import { ContentType } from './shared'

export interface Genre {
  name: string
}

export interface GenresResponse {
  genres: ContentType<Genre>
}
