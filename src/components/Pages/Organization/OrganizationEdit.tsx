import { useParams } from 'react-router-dom';
import { ORGANIZATION } from 'queries/organization';
import { OrganizationResponse } from 'utils/models/auth';
import { useQuery } from '@apollo/client';
import { EditForm } from 'components/Pages/Organization/EditForm';

export const OrganizationEdit = () => {
  const { orgId = null } = useParams();
  const { data, loading } = useQuery<OrganizationResponse>(ORGANIZATION, {
    variables: {
      id: orgId,
    }
  });

  return (
    <div>
      {!loading && data?.organization && <>
        <h2>Organization: <i>{data.organization.name}</i></h2> 
        <EditForm
          organization={data.organization}
        />
      </>}
    </div>
  );
}