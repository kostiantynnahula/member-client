import { useParams } from 'react-router-dom';
import { ORGANIZATION } from 'queries/organization';
import { OrganizationResponse } from 'utils/models/auth';
import { useQuery } from '@apollo/client';


export const OrganizationEdit = () => {
  const { orgId = null } = useParams();
  const { data, loading } = useQuery<OrganizationResponse>(ORGANIZATION, {
    variables: {
      id: orgId,
    }
  });

  console.log(data?.organization);

  return (
    <div>
      {!loading && data?.organization && <>
        <div><b>Organization name:</b> {data.organization.name}</div>
        <div><b>Organization description:</b> {data.organization.description}</div>
        <ul>
          {data.organization.members.map(member => (
            <li>{member.username} [{member.role}]</li>
          ))}
        </ul>
      </>}
    </div>
  );
}