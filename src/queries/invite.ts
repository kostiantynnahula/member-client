import { gql } from '@apollo/client';

export const CREATE_INVITE = gql`
  mutation createInvite($inviteData: CreateInviteInput!) {
    createInvite(createInviteInput: $inviteData) {
      _id
      status
    }
  }
`;

export const ORGANIZATION_INVITES = gql`
  query invites($orgId: String!) {
    orgInvites(_id: $orgId) {
      _id
      status
      from
      to
      secret
      organization
    }
  }
`;

export const APPROVE_INVITE = gql`
  mutation approveInvite($approveInvite: ApproveInviteInput!) {
    approveInvite(approveInvite: $approveInvite) {
      _id
    }
  }
`;