import { useContext } from 'react';
import { Container, Nav, Navbar as BootstaroNavBar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { GET_AUTH_PROFILE } from './../../../queries/auth';
import { useQuery } from '@apollo/client';
import { AuthProfileCache } from './../../../utils/models/auth';
import { LocalStorageService } from './../../../utils/services/LocalStorage';
import { AuthContext } from './../../../App';

export const Navbar = () => {

  const { data } = useQuery<AuthProfileCache>(GET_AUTH_PROFILE);
  const { setAuth } = useContext(AuthContext);

  const onLogout = () => {
    LocalStorageService.clearAuth();
    setAuth(null);
  }

  return (
    <div className="navbar-container">
      <BootstaroNavBar bg="light" variant="light">
        <Container>
          <BootstaroNavBar.Brand as={Link} to='/'>Member</BootstaroNavBar.Brand>
          <Nav className="justify-content-end">
            <Nav.Link 
              as={Link}
              to='/profile'
            >{data?.profile.username || 'Profile'}</Nav.Link>
            <Nav.Link 
              onClick={onLogout}
            >Logout</Nav.Link>
          </Nav>
        </Container>
      </BootstaroNavBar>
    </div>
  )   
}