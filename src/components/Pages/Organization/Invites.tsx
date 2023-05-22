import { useState } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { ORGANIZATION_INVITES } from 'queries/invite';
import { OrganizationInvitesResponse } from 'utils/models/organization';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { InviteModal } from './InviteModal';

export const Invites = () => {
  const { orgId } = useParams();

  const { data: invites, loading: invitesLoading } = useQuery<OrganizationInvitesResponse>(ORGANIZATION_INVITES, {
    variables: {
      orgId,
    }
  });

  const [inviteModal, setInviteModal] = useState<boolean>(false);

  return (
    <div>
      <h3>Invites</h3>
      <>
        {invitesLoading && <div className='text-center'><Spinner/></div>}
        {!invitesLoading && invites && invites.orgInvites.length === 0 && <p className='text-center'>Invites list is empty</p>}
        {!invitesLoading && invites && invites.orgInvites.length > 0 && 
          <ul>
            {invites.orgInvites.map((invite, key) => (
              <li key={key}>
                <span><b>From:</b>{invite.from}</span>
                <span>{' -> '}</span> 
                <span><b>To:</b>{invite.to}</span>
                <b> {invite.status}</b>
              </li>
            ))}
          </ul>
        }
        <Button   
          variant='outline-primary'
          onClick={() => setInviteModal(true)}
        >Invite new</Button>
      </>
      <InviteModal
        show={inviteModal}
        setShow={setInviteModal}
      />
    </div>
  );
}