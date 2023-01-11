import { Row, Col } from 'react-bootstrap';
import { FolderItem } from './../Folder/FolderItem';
import './Dashboard.scss'

export const Dashboard = () => {
  return (
    <>
      <h3>Dashboard component</h3>
      <Row xs="auto">
        <Col>
          <FolderItem
            id='1'
            name='First folder'
          />
        </Col>
        <Col>
          <FolderItem
            id='2'
            name='Second folder'
          />
        </Col>
      </Row>
    </>
  );
};