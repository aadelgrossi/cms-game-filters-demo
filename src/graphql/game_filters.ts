import { gql } from '@apollo/client'

export const GAME_FILTERS = gql`
  query gamesFilters($slug: String) {
    gamesFilters(filters: { slug: { eq: $slug } }) {
      data {
        attributes {
          slug
          query
        }
      }
    }
  }
`
