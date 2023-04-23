import { useParams } from 'react-router-dom';

export const OrganizationEdit = () => {
  const { orgId = null } = useParams();
  
  return (
    <div>Organization Edit</div>
  );
}