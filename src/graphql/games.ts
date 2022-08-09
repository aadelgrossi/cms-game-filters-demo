import { gql } from '@apollo/client'

export const GAMES = gql`
  query allGames(
    $freeToPlay: Boolean
    $featured: Boolean
    $keywords: String
    $date: Date
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
