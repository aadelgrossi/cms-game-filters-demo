import qs from 'querystring'

import { useEffect, useState } from 'react'

import { useQuery } from '@apollo/client'
import { Card, Checkbox, Col, Container, Input, Text } from '@nextui-org/react'
import { startOfDay, subDays, subMonths } from 'date-fns'
import { NextPage } from 'next'
import Image from 'next/image'
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
    value: startOfDay(subDays(new Date(), 7)).toISOString(),
    label: 'Last 7 days'
  },
  {
    value: startOfDay(subDays(new Date(), 30)).toISOString(),
    label: 'Last 30 days'
  },
  {
    value: startOfDay(subMonths(new Date(), 6)).toISOString(),
    label: 'Last 6 months'
  },
  {
    value: startOfDay(subMonths(new Date(), 12)).toISOString(),
    label: 'Last 12 months'
  }
]

const GameFilter: NextPage = () => {
  const [isMounted, setIsMounted] = useState(false)
  const { query } = useRouter()
  const slug = query?.slug as string

  const { data: gameFiltersResponse } = useQuery<
    GameFilterResponse,
    GameFilterVariables
  >(GAME_FILTERS, {
    variables: { slug },
    skip: !slug
  })

  useEffect(() => {
    setIsMounted(true)
  }, [])

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

  const { data: allGames } = useQuery<GamesResponse, GamesVariables>(GAMES, {
    variables: parsedQuery
  })

  return isMounted ? (
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

      <Container display="flex" css={{ my: 52, gap: 16 }}>
        {allGames?.games.data.map(game => {
          const logoData = game.attributes.logo.data
          return (
            <Container
              display="flex"
              css={{
                flexFlow: 'row',
                p: 16,
                gap: 24,
                maxWidth: 500,
                borderRadius: '$lg',
                bg: '$accents0'
              }}
              key={game.id}
            >
              <Col>
                <Text h3>{game.attributes.name}</Text>
                <Text as="p" color="$gray700">
                  {game.attributes.subtitle}
                </Text>
                <Text as="p" color="$gray700">
                  Genres:{' '}
                  {game.attributes.genres.data
                    .map(genre => genre.attributes.name)
                    .join(', ')}
                </Text>
              </Col>
              {logoData && (
                <Image
                  alt={game.attributes.name}
                  width={120}
                  height={120}
                  layout="intrinsic"
                  placeholder="blur"
                  style={{
                    borderRadius: 16
                  }}
                  blurDataURL={logoData?.attributes.placeholder || ''}
                  src={logoData?.attributes.url || ''}
                />
              )}
            </Container>
          )
        })}
      </Container>

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
  ) : null
}

export default GameFilter
