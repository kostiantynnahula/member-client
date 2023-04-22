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

export const GET_AUTH_PROFILE = gql`
  query authProfile {
    profile {
      _id
      email
      username
    },
    organizations {
      _id
      name
      description
    }
  }
`;

export const UPDATE_PROFILE = gql`
  mutation updateProfile($updateProfilePayload: ProfileInput!) {
    updateProfile(profileInput: $updateProfilePayload) {
      _id
      email
      username
    }
  }
`;