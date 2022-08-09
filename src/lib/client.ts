import { ApolloClient, InMemoryCache } from '@apollo/client'

const token = process.env.NEXT_PUBLIC_API_TOKEN

const client = new ApolloClient({
  uri: 'https://polkastarter-cms.herokuapp.com/graphql',
  cache: new InMemoryCache(),
  headers: {
    Authorization: `Bearer ${token}`
  }
})

export default client
