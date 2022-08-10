import { useEffect, useState } from 'react'

import { Card, Checkbox, Col, Container, Input, Text } from '@nextui-org/react'
import { format, parseISO } from 'date-fns'
import { NextPage } from 'next'
import Image from 'next/image'
import Select from 'react-select'

import {
  platformsOptions,
  DateOption,
  dateOptions,
  PlatformOption
} from '~/constants'
import { gameStatusOptions, StatusOption } from '~/constants/gameStatusOptions'
import useGameFilter from '~/hooks/useGameFilter'
import { dropdownStyles } from '~/styles/select'

const GameFilter: NextPage = () => {
  const [isMounted, setIsMounted] = useState(false)
  const {
    allGames,
    genresOptions,
    freeToPlay,
    setFreeToPlay,
    date,
    setDate,
    platforms,
    setPlatforms,
    genres,
    setGenres,
    gameStatus,
    setGameStatus
  } = useGameFilter()

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
          const rating = game.attributes.review.data?.attributes.rating
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
                <Text color="$gray800">
                  Genres:{' '}
                  {game.attributes.genres.data
                    .map(genre => genre.attributes.name)
                    .join(', ')}
                </Text>
                <Text color="$gray800">
                  Platforms:{' '}
                  {game.attributes.platforms
                    .map(platform => platform.name)
                    .join(', ')}
                </Text>
                {rating && (
                  <Text color="$gray800">
                    Rating: {game.attributes.review.data?.attributes.rating}
                  </Text>
                )}
                <Text color="$gray800">
                  Date added:{' '}
                  {format(parseISO(game.attributes.createdAt), 'dd MMM yyyy')}
                </Text>
                <Text color="$gray800">
                  Free To Play: {game.attributes.freeToPlay ? 'Yes' : 'No'}
                </Text>
                <Text color="$gray800">Status: {game.attributes.status}</Text>
              </Col>
              {logoData && (
                <Image
                  alt={game.attributes.name}
                  width={160}
                  height={160}
                  layout="fixed"
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
            isMulti
            value={platformsOptions.filter(option =>
              platforms?.includes(option.value)
            )}
            onChange={item => {
              const value = (item as PlatformOption[]).map(opt => opt.value)
              setPlatforms(value)
            }}
            menuPortalTarget={document.body}
            styles={dropdownStyles}
            placeholder="Platforms"
            options={platformsOptions}
          />
          <Select
            value={gameStatusOptions.find(
              option => option.value === gameStatus
            )}
            onChange={item => setGameStatus((item as StatusOption)?.value)}
            menuPortalTarget={document.body}
            styles={dropdownStyles}
            placeholder="Status"
            options={gameStatusOptions}
          />

          <Select
            value={dateOptions.find(option => option.value === date)}
            onChange={item => setDate((item as DateOption)?.value)}
            menuPortalTarget={document.body}
            styles={dropdownStyles}
            placeholder="Date added"
            options={dateOptions}
          />
          <Select
            isMulti
            value={genresOptions.filter(option =>
              genres?.includes(option.value)
            )}
            onChange={item => {
              const value = (item as PlatformOption[]).map(opt => opt.value)
              setGenres(value)
            }}
            menuPortalTarget={document.body}
            styles={dropdownStyles}
            placeholder="Genres"
            options={genresOptions}
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
          <Checkbox
            isSelected={freeToPlay}
            onChange={setFreeToPlay}
            label="Free To Play"
          />
        </Container>
      </Card>
    </Container>
  ) : null
}

export default GameFilter
