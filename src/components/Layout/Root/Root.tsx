import { createContext, useState } from 'react';
import { Navbar } from 'components/Layout/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { ConfirmModal } from 'components/Layout/ConfirmModal';

export interface IConfirmModalContext {
  show: boolean;
  details: {
    title: string;
    description: string;
  },
  onSubmit: (data?: any) => void
}

const defaultContext = {
  context: {
    show: false,
    details: {
      title: 'Confirm modal',
      description: 'Are you sure?'
    },
    onSubmit: () => {},
  }
};

export const ConfirmModalContext = createContext({
  context: defaultContext.context,
  setContext: (context: IConfirmModalContext) => {}
});

export interface WrapperProps {
  children: JSX.Element;
}

export const Root = () => {

  const [ context, setContext ] = useState<IConfirmModalContext>(defaultContext.context);

  return (
    <>
      <ConfirmModalContext.Provider value={{ context, setContext }}>
        <Navbar/>
        <Container>
          <Row>
            <Col className='mt-2 mb-2'>
              <Outlet/>
            </Col>
          </Row>
        </Container>
        <ConfirmModal/>
      </ConfirmModalContext.Provider>
    </>
  );
}