import {
  Container,
  Nav,
  Navbar as BootstaroNavBar,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <div className="navbar-container">
      <BootstaroNavBar bg="light" variant="light">
        <Container>
          <BootstaroNavBar.Brand as={Link} to='/'>Member</BootstaroNavBar.Brand>
          <Nav className="me-auto">
            <Nav.Link 
              as={Link}
              to='/profile'
            >Profile</Nav.Link>
          </Nav>
        </Container>
      </BootstaroNavBar>
    </div>
  )   
}