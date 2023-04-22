import { gql } from '@apollo/client';

export const CREATE_ORGANIZATION = gql`
  mutation createOrganization($organizationInput: OrganizationInput!) {
    registerOrganization(organizationInput: $organizationInput) {
      _id
      name
      description
    }
  }
`;

export const ORGANIZATIONS = gql`
  query getOrganizations {
    organizations {
      _id
      name
      description
    }
  }
`;