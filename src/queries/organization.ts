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
      members {
        _id
        username
        email
        role
      }
    }
  }
`;

export const ORGANIZATION = gql`
  query getOrganization($id: String!) {
    organization(id: $id) {
      _id
      name
      description
      members {
        _id
        username
        email
        role
      }
    }
  }
`;

export const UPDATE_ORGANIZATION = gql`
  mutation updateOrganization($id: String!, $updateOrganizationInput: OrganizationInput!) {
    updateOrganization(id: $id, updateOrganizationInput: $updateOrganizationInput) {
      _id
      name
      description
    }
  }
`;

export const UPDATE_MEMBER = gql`
  mutation updateMember($editMemberInput: MemberEditInput!) {
    editMember(editMemberInput: $editMemberInput) {
      _id
    }
  } 
`