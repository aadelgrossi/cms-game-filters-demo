import { useEffect, useState } from 'react'

import { Card, Checkbox, Col, Container, Input, Text } from '@nextui-org/react'
import { startOfDay, subDays, subMonths } from 'date-fns'
import { NextPage } from 'next'
import Image from 'next/image'
import Select from 'react-select'

import useGameFilter from '~/hooks/useGameFilter'
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
  const { allGames, allGenres } = useGameFilter()

  useEffect(() => {
    setIsMounted(true)
  }, [])

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

      <Container
        display="flex"
        css={{
          my: 50,
          p: 0,
          gap: 16
        }}
      >
        {allGames?.games.data.map(game => {
          const logoData = game.attributes.logo.data
          return (
            <Container
              display="flex"
              justify="space-between"
              css={{
                p: 16,
                maxWidth: 450,
                borderRadius: '$lg',
                bg: '$accents0'
              }}
              key={game.id}
            >
              <Col
                css={{
                  width: 'max-content'
                }}
              >
                <Text h3>{game.attributes.name}</Text>
                <Text color="$gray700">{game.attributes.subtitle}</Text>
                <Text color="$gray700">
                  Genres:{' '}
                  {game.attributes.genres.data
                    .map(genre => genre.attributes.name)
                    .join(', ')}
                </Text>
                <Text color="$gray700">
                  Platforms:{' '}
                  {game.attributes.platforms
                    .map(platform => platform.name)
                    .join(', ')}
                </Text>
                <Text color="$gray700">
                  Rating: {game.attributes.review.data?.attributes.rating}
                </Text>
              </Col>
              {logoData && (
                <Image
                  alt={game.attributes.name}
                  width={160}
                  height={160}
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
