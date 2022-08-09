import { gql } from '@apollo/client'

export const GAMES = gql`
  query allGames(
    $freeToPlay: Boolean
    $featured: Boolean
    $keywords: String
    $date: DateTime
    $genres: [String!]
  ) {
    games(
      filters: {
        freeToPlay: { eq: $freeToPlay }
        featured: { eq: $featured }
        name: { containsi: $keywords }
        genres: { or: { name: { in: $genres } } }
        createdAt: { gte: $date }
      }
    ) {
      data {
        id
        attributes {
          name
          subtitle
          featured
          releaseDate
          platforms {
            name
          }
          logo {
            data {
              attributes {
                url
                width
                height
                placeholder
              }
            }
          }
          genres {
            data {
              attributes {
                name
              }
            }
          }
        }
      }
    }
  }
`
