import { Navbar } from '../Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

export interface WrapperProps {
  children: JSX.Element;
}

export const Root = () => {
  return (
    <>
      <Navbar/>
      <Container>
        <Row>
          <Col>
            <Outlet/>
          </Col>
        </Row>
      </Container>
    </>
  );
}