import { useState, useCallback } from 'react';
import { Row, Col, Button, Modal } from 'react-bootstrap';
import { FolderItem } from './../Folder/FolderItem';
import { File } from './../Folder/File';
import './Dashboard.scss'

export const Dashboard = () => {

  const [folderModal, setFolderModal] = useState<boolean>(false);
  const [fileModal, setFileModal] = useState<boolean>(false);

  const onSubmitFolder = useCallback(() => {
    setFolderModal(false);
  }, [folderModal]);

  const onSubmitFile = useCallback(() => {
    setFileModal(false);
  }, [fileModal]);

  return (
    <>
      <h3>Dashboard component</h3>
      <div>
        <Row xs="auto">
          <Col>
            <Button
              onClick={() => setFolderModal(true)}
            >Add folder</Button>
          </Col>
          <Col>
            <Button
              onClick={() => setFileModal(true)}
            >Add file</Button>
          </Col>
        </Row>
      </div>
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
      <div>
        <Row xs="auto">
          <Col>
            <File/>
          </Col>
        </Row>
      </div>
      <Modal show={folderModal} onHide={() => setFolderModal(false)} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Folder modal</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setFolderModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={onSubmitFolder}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={fileModal} onHide={() => setFileModal(false)} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>File modal</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setFileModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={onSubmitFile}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};