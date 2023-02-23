import { useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { BsFolderPlus, BsFillFileEarmarkArrowUpFill } from 'react-icons/bs';
import { FolderModal } from 'components/Pages/Dashboard/Modals/FolderModal';
import { FileModal } from 'components/Pages/Folders/modals/FileModal';
import { Outlet } from 'react-router-dom';
import './Dashboard.scss'

export const Dashboard = () => {

  const [folderModal, setFolderModal] = useState<boolean>(false);
  const [fileModal, setFileModal] = useState<boolean>(false);

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
      <Outlet/>
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