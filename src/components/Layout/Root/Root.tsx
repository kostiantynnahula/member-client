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
          <Col className='mt-2 mb-2'>
            <Outlet/>
          </Col>
        </Row>
      </Container>
    </>
  );
}