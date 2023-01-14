import { gql } from '@apollo/client';

export const GOOGLE_LOGIN = gql`
  mutation googleLogin($googleLoginPayload: GoogleInput!) {
    signInGoogle(googleInput: $googleLoginPayload) {
      _id
      token
    }
  }
`;

export const FACEBOOK_LOGIN = gql`
  mutation facebookLogin($facebookInput: FacebookInput!) {
    signInFacebook(facebookInput: $facebookInput) {
      _id
      token
    }
  }
`;
