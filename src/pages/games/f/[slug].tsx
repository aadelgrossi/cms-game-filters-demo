import qs from 'querystring'

import { useQuery } from '@apollo/client'
import { Card, Checkbox, Container, Input, Text } from '@nextui-org/react'
import { startOfDay, subDays, subMonths } from 'date-fns'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Select from 'react-select'

import { GAME_FILTERS } from '~/graphql/game_filters'
import { GAMES } from '~/graphql/games'
import { ALL_GENRES } from '~/graphql/genres'
import {
  GameFilterResponse,
  GameFilterVariables,
  GamesResponse,
  GamesVariables
} from '~/graphql/types'
import { GenresResponse } from '~/graphql/types/genres'
import { dropdownStyles } from '~/styles/select'

const dateOptions = [
  {
    value: undefined,
    label: 'All time'
  },
  {
    value: startOfDay(subDays(new Date(), 7)),
    label: 'Last 7 days'
  },
  {
    value: startOfDay(subDays(new Date(), 30)),
    label: 'Last 30 days'
  },
  {
    value: startOfDay(subMonths(new Date(), 6)),
    label: 'Last 6 months'
  },
  {
    value: startOfDay(subMonths(new Date(), 12)),
    label: 'Last 12 months'
  }
]

const GameFilter: NextPage = () => {
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

  const responseSlug =
    gameFiltersResponse?.gamesFilters?.data[0]?.attributes?.query ?? ''

  const parsedQuery =
    slug === 'all' || !responseSlug
      ? ({} as GamesVariables)
      : (qs.parse(responseSlug || '') as GamesVariables)

  const { data: _allGames } = useQuery<GamesResponse, GamesVariables>(GAMES, {
    variables: parsedQuery
  })

  if (typeof document === 'undefined') return null
  return (
    <Container
      fluid
      display="flex"
      direction="column"
      justify="center"
      alignItems="center"
      css={{
        minHeight: '100vh'
      }}
    >
      <Text h1>Games</Text>
      <Text as="pre">{JSON.stringify(gameFiltersResponse, null, 2)}</Text>

      <Card
        css={{
          maxWidth: 1600,
          p: 40,
          gap: 20,
          justifyContent: 'space-between'
        }}
      >
        <Container fluid justify="space-between" display="flex">
          <Select
            menuPortalTarget={document.body}
            styles={dropdownStyles}
            isMulti
            placeholder="Platforms"
            options={[
              {
                value: 'windows',
                label: 'Windows'
              },
              {
                value: 'mac_os',
                label: 'Mac OS'
              },
              {
                value: 'ios',
                label: 'iOS'
              },
              {
                value: 'android',
                label: 'Android'
              }
            ]}
          />
          <Select
            menuPortalTarget={document.body}
            styles={dropdownStyles}
            isMulti
            placeholder="status"
            options={[
              {
                value: 'playable',
                label: 'Playable'
              },
              {
                value: 'in_development',
                label: 'In Development'
              }
            ]}
          />

          <Select
            menuPortalTarget={document.body}
            styles={dropdownStyles}
            placeholder="Date added"
            options={dateOptions}
          />
          <Select
            isMulti
            menuPortalTarget={document.body}
            styles={dropdownStyles}
            placeholder="Genres"
            options={allGenres}
          />
        </Container>
        <Container
          fluid
          display="flex"
          css={{
            p: 0,
            justifyContent: 'space-between'
          }}
        >
          <Input
            fullWidth
            css={{ maxWidth: 300 }}
            underlined
            placeholder="Min Rating"
          />
          <Input
            css={{ maxWidth: 300 }}
            fullWidth
            underlined
            placeholder="Keywords"
          />
          <Checkbox label="Free To Play" />
        </Container>
      </Card>
    </Container>
  )
}

export default GameFilter
