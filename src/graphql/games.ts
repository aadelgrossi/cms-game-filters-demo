import { gql } from '@apollo/client'

export const GAMES = gql`
  query allGames(
    $freeToPlay: Boolean
    $featured: Boolean
    $keywords: String
    $date: Date
    $genres: [String!]
    $platforms: [String!]
    $rating: Int
    $status: String
  ) {
    games(
      filters: {
        freeToPlay: { eq: $freeToPlay }
        featured: { eq: $featured }
        releaseDate: { gte: $date }
        review: { rating: { gt: $rating } }
        status: { eq: $status }
        genres: { name: { in: $genres } }
        platforms: { name: { in: $platforms } }
        or: [
          { name: { containsi: $keywords } }
          { subtitle: { containsi: $keywords } }
        ]
      }
    ) {
      data {
        id
        attributes {
          name
          subtitle
          featured
          releaseDate
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
