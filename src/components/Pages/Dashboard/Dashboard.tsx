import { useState, createContext } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { BsFolderPlus, BsFillFileEarmarkArrowUpFill } from 'react-icons/bs';
import { FolderModal } from './Modals/FolderModal';
import { FileModal } from './FileModal';
import { EditFolderModal } from './Modals/EditFolderModal';
import { Outlet } from 'react-router-dom';
import './Dashboard.scss'

export interface IEditFolderModalContext {
  show: boolean,
  data: {
    name: string,
  }
  onSubmit: (data?: any) => void
}

const defaultContext = {
  show: false,
  data: {
    name: ''
  },
  onSubmit: (data?: any) => {},
};

export const EditModalContext = createContext({
  context: defaultContext,
  setContext: (context: IEditFolderModalContext) => {}
});


export const Dashboard = () => {

  const [folderModal, setFolderModal] = useState<boolean>(false);
  const [fileModal, setFileModal] = useState<boolean>(false);

  const [ context, setContext ] = useState<IEditFolderModalContext>(defaultContext);

  return (
    <>
      <div>
        <Row xs="auto">
          <Col>
            <Button
              size='lg'
              variant='outline-primary'
              onClick={() => setFolderModal(true)}
            ><BsFolderPlus/></Button>
          </Col>
          <Col>
            <Button
              size='lg' 
              variant='outline-primary'
              onClick={() => setFileModal(true)}
            ><BsFillFileEarmarkArrowUpFill/></Button>
          </Col>
        </Row>
      </div>
      <hr />
      <EditModalContext.Provider value={{ context, setContext }}>
        <Outlet/>
        <EditFolderModal/>
      </EditModalContext.Provider>
      <FolderModal
        show={folderModal}
        setModalShow={setFolderModal}
      />
      <FileModal
        show={fileModal}
        setModalShow={setFileModal}
      />
    </>
  );
};