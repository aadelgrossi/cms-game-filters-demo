import qs from 'querystring'

import { useQuery } from '@apollo/client'
import {
  Card,
  Checkbox,
  Container,
  Dropdown,
  Input,
  Text
} from '@nextui-org/react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

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
    genresResponse?.genres.data.map(genre => genre.attributes.name) || []

  const responseSlug =
    gameFiltersResponse?.gamesFilters?.data[0]?.attributes?.query ?? ''

  const parsedQuery =
    slug === 'all'
      ? ({} as GamesVariables)
      : (qs.parse(responseSlug || '') as GamesVariables)

  const { data: _allGames } = useQuery<GamesResponse, GamesVariables>(GAMES, {
    variables: parsedQuery
  })

  return (
    <Container
      css={{
        minHeight: '100vh'
      }}
    >
      <Text h1>Games</Text>
      <Text as="pre">{JSON.stringify(gameFiltersResponse, null, 2)}</Text>

      <Card
        css={{
          maxWidth: 1080,
          p: 40,
          gap: 20,
          justifyContent: 'space-between'
        }}
      >
        <Container fluid justify="space-between" display="flex">
          <Dropdown>
            <Dropdown.Button flat>Platforms</Dropdown.Button>
            <Dropdown.Menu>
              {['windows', 'mac_os', 'ios', 'android'].map(option => {
                return <Dropdown.Item key={option}>{option}</Dropdown.Item>
              })}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown>
            <Dropdown.Button flat>Status</Dropdown.Button>
            <Dropdown.Menu>
              {['playable', 'in_development'].map(option => {
                return <Dropdown.Item key={option}>{option}</Dropdown.Item>
              })}
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown>
            <Dropdown.Button flat>Genre</Dropdown.Button>
            <Dropdown.Menu>
              {allGenres.map(genre => {
                return <Dropdown.Item key={genre}>{genre}</Dropdown.Item>
              })}
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown>
            <Dropdown.Button flat>Date added</Dropdown.Button>
            <Dropdown.Menu>
              {[
                'last 7 days',
                'last 30 days',
                'last 6 months',
                'last 12 months'
              ].map(option => {
                return <Dropdown.Item key={option}>{option}</Dropdown.Item>
              })}
            </Dropdown.Menu>
          </Dropdown>
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
