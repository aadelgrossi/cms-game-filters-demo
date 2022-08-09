import { gql } from '@apollo/client'

export const ALL_GENRES = gql`
  query allGenres {
    genres {
      data {
        id
        attributes {
          name
        }
      }
    }
  }
`
