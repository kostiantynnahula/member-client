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
          <BootstaroNavBar.Brand as={Link} to='/'>Navbar</BootstaroNavBar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Add a folder</Nav.Link>
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