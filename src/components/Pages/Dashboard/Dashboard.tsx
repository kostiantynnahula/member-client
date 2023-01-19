import { useState, useCallback } from 'react';
import { Row, Col, Button, Modal } from 'react-bootstrap';
import { FolderItem } from './../Folder/FolderItem';
import { File } from './../Folder/File';
import { BsFolderPlus, BsFillFileArrowUpFill } from 'react-icons/bs';
import { FolderModal } from './FolderModal';
import { FileModal } from './FileModal';
import './Dashboard.scss'

export const Dashboard = () => {

  const [folderModal, setFolderModal] = useState<boolean>(false);
  const [fileModal, setFileModal] = useState<boolean>(false);

  return (
    <>
      <h3>Dashboard component</h3>
      <hr/>
      <div>
        <Row xs="auto">
          <Col>
            <Button
              variant='outline-primary'
              onClick={() => setFolderModal(true)}
            ><BsFolderPlus/></Button>
          </Col>
          <Col>
            <Button 
              variant='outline-primary'
              onClick={() => setFileModal(true)}
            ><BsFillFileArrowUpFill/></Button>
          </Col>
        </Row>
      </div>
      <hr />
      <div className='mb-2 mt-2'>
        <Row>
          <Col xs={2}>
            <FolderItem
              id='1'
              name='First folder'
            />
          </Col>
          <Col xs={2}>
            <FolderItem
              id='2'
              name='Second folder'
            />
          </Col>
        </Row>
      </div>
      <hr />
      <div className='mb-2 mt-2'>
        <Row>
          <Col xs={2}>
            <File/>
          </Col>
        </Row>
      </div>
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