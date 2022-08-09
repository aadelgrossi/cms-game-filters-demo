import qs from 'querystring'

import { useEffect, useState } from 'react'

import { useQuery } from '@apollo/client'
import { parseISO } from 'date-fns'
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

  const [freeToPlay, setFreeToPlay] = useState<boolean>()
  const [date, setDate] = useState<string>()

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
          featured: parsedQuery.featured ? !!parsedQuery.featured : undefined,
          rating: parsedQuery.rating
            ? parseFloat(parsedQuery.rating)
            : undefined
        }

  useEffect(() => {
    if (!parsedQuery) return

    if (parsedQuery.freeToPlay && freeToPlay === undefined) {
      setFreeToPlay(!!parsedQuery.freeToPlay)
    }
    if (parsedQuery.date && date === undefined) {
      setDate(parseISO(parsedQuery.date).toISOString())
    }
  }, [parsedQuery, freeToPlay, date])

  const { data: allGames } = useQuery<GamesResponse, GamesVariables>(GAMES, {
    variables: {
      ...variables,
      date,
      freeToPlay
    }
  })

  return {
    allGames,
    allGenres,
    variables,
    freeToPlay,
    setFreeToPlay,
    date,
    setDate
  }
}

export default useGameFilter
