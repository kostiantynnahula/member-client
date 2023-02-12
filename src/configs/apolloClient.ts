import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { LocalStorageService } from 'utils/services/LocalStorage';
import { setContext } from '@apollo/client/link/context'

const httpLink = createHttpLink({
  uri: `${process.env.REACT_APP_SERVER_URI}/graphql`
});

const authLink = setContext((_, { headers }) => {
  const auth = LocalStorageService.getAuth();

  return {
    headers: {
      ...headers,
      authorization: auth ? `Bearer ${auth.token}` : ''
    }
  }
})

export const apolloClient = new ApolloClient({
  // uri: `${process.env.REACT_APP_SERVER_URI}/graphql`,
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})