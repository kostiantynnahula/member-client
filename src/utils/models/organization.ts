export enum InviteStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
}

export interface Invite {
  _id: string;
  status: InviteStatus;
  from: string;
  to: string;
  secret: string;
  organiztion: string;
}

export interface OrganizationInvitesResponse {
  orgInvites: Invite[];
}