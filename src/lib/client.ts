import { createClient } from 'urql'

const token = process.env.NEXT_PUBLIC_API_TOKEN

const client = createClient({
  url: 'https://polkastarter-cms.herokuapp.com/graphql',
  fetchOptions: () => {
    return {
      headers: { authorization: `Bearer ${token}`, normalize: 'true' }
    }
  }
})

export default client
