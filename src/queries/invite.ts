import { gql } from '@apollo/client';

export const CREATE_INVITE = gql`
  mutation createInvite($inviteData: CreateInviteInput!) {
    createInvite(createInviteInput: $inviteData) {
      _id
      status
    }
  }
`;