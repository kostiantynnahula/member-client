import { ApolloClient, InMemoryCache } from '@apollo/client';

export const apolloClient = new ApolloClient({
  uri: process.env.REACT_APP_SERVER_URI,
  cache: new InMemoryCache(),
})