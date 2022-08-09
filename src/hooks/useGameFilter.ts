import qs from 'querystring'

import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'

import { GAME_FILTERS } from '~/graphql/game_filters'
import { GAMES } from '~/graphql/games'
import { ALL_GENRES } from '~/graphql/genres'
import {
  GameFilterResponse,
  GameFilterVariables,
  GamesResponse,
  GamesVariables,
  GenresResponse
} from '~/graphql/types'

const useGameFilter = () => {
  const { query } = useRouter()
  const slug = query?.slug as string

  const { data: gameFiltersResponse } = useQuery<
    GameFilterResponse,
    GameFilterVariables
  >(GAME_FILTERS, {
    variables: { slug },
    skip: !slug
  })
  const { data: genresResponse } = useQuery<GenresResponse>(ALL_GENRES)

  const allGenres =
    genresResponse?.genres.data.map(genre => ({
      value: genre.attributes.name,
      label: genre.attributes.name
    })) || []

  const rawQuery =
    gameFiltersResponse?.gamesFilters?.data[0]?.attributes?.query ?? ''

  const parsedQuery = qs.parse(rawQuery || '') as Record<string, string>

  const variables: GamesVariables =
    slug === 'all' || !rawQuery
      ? {}
      : {
          ...parsedQuery,
          freeToPlay: parsedQuery.freeToPlay
            ? !!parsedQuery.freeToPlay
            : undefined,
          featured: parsedQuery.featured ? !!parsedQuery.featured : undefined,
          rating: parseFloat(parsedQuery.rating)
        }

  const { data: allGames } = useQuery<GamesResponse, GamesVariables>(GAMES, {
    variables
  })

  return { allGames, allGenres }
}

export default useGameFilter
