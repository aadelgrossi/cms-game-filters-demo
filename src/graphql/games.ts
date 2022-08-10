import { gql } from '@apollo/client'

export const GAMES = gql`
  query allGames(
    $freeToPlay: Boolean
    $featured: Boolean
    $keywords: String
    $date: DateTime
    $genres: [String!]
    $platforms: [String!]
    $rating: Int
    $status: String
  ) {
    games(
      filters: {
        freeToPlay: { eq: $freeToPlay }
        featured: { eq: $featured }
        name: { containsi: $keywords }
        createdAt: { gte: $date }
        review: { rating: { gt: $rating } }
        status: { eq: $status }
        and: {
          genres: { name: { in: $genres } }
          platforms: { name: { in: $platforms } }
        }
      }
    ) {
      data {
        id
        attributes {
          name
          subtitle
          featured
          releaseDate
          createdAt
          freeToPlay
          status
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
          platforms {
            name
          }
          review {
            data {
              attributes {
                rating
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
