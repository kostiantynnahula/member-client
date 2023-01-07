import {
  Container,
  Nav,
  Navbar as BootstaroNavBar,
} from 'react-bootstrap';

export const Navbar = () => {
  return (
    <div className="navbar-container">
      <BootstaroNavBar bg="light" variant="light">
        <Container>
          <BootstaroNavBar.Brand href="#home">Navbar</BootstaroNavBar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </BootstaroNavBar>
    </div>
  )   
}