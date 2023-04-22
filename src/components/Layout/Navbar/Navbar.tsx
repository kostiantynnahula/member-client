import { useContext } from 'react';
import { 
  Container,
  Nav,
  Navbar as BootstrapNavbar,
  NavDropdown,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { GET_AUTH_PROFILE } from 'queries/auth';
import { useQuery } from '@apollo/client';
import { AuthProfileCache } from 'utils/models/auth';
import { LocalStorageService } from 'utils/services/LocalStorage';
import { AuthContext } from 'App';
import { OrganizationModal } from 'components/Layout/Navbar/OrganizationModal';
import { useState } from 'react';

export const Navbar = () => {

  const { data } = useQuery<AuthProfileCache>(GET_AUTH_PROFILE);
  const { setAuth } = useContext(AuthContext);
  const [show, setShow] = useState<boolean>(false);

  const onLogout = () => {
    LocalStorageService.clearAuth();
    setAuth(null);
  }

  return (
    <div className="navbar-container">
      <BootstrapNavbar bg="light" variant="light">
        <Container>
          <BootstrapNavbar.Brand as={Link} to='/'>Member</BootstrapNavbar.Brand>
          <Nav className="justify-content-end">
            <NavDropdown title="Organization">
              {data?.organizations.map(organization => (
                <NavDropdown.Item>{organization.name}</NavDropdown.Item>  
              ))}
              <NavDropdown.Item onClick={() => setShow(true)}>Add new one</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link 
              as={Link}
              to='/profile'
            >{data?.profile.username || 'Profile'}</Nav.Link>
            <Nav.Link 
              onClick={onLogout}
            >Logout</Nav.Link>
          </Nav>
        </Container>
      </BootstrapNavbar>
      <OrganizationModal
        show={show}
        setShow={setShow}
      />
    </div>
  )   
}