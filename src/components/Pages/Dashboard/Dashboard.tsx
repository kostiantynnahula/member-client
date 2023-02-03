import { useState, createContext } from 'react';
import { Row, Col, Button, Spinner } from 'react-bootstrap';
import { FolderItem } from './../Folder/FolderItem';
import { File } from './../Folder/File';
import { BsFolderPlus, BsFillFileEarmarkArrowUpFill } from 'react-icons/bs';
import { FolderModal } from './Modals/FolderModal';
import { FileModal } from './FileModal';
import { useQuery } from '@apollo/client';
import { GET_FOLDERS } from './../../../queries/folder';
import { GetFoldersResponse } from './../../../utils/models/folder';
import { EditFolderModal } from './Modals/EditFolderModal';
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

  const { loading, data } = useQuery<GetFoldersResponse>(GET_FOLDERS, {
    variables: {
      params: {
        page: 1,
        limit: 100
      }
    }
  });

  return (
    <>
      <h3>Dashboard component</h3>
      <hr/>
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
        <div className='mb-2 mt-2'>
          {loading && <Row className='text-center'>
            <Col>
              <Spinner variant='primary'/>
            </Col>  
          </Row>}
          <Row>
            {!loading && data?.getFolderList.map((folder) => (
              <Col xs={2} key={folder._id}>
                <FolderItem
                  id={folder._id}
                  name={folder.name}
                />
              </Col>
            ))}
          </Row>
        </div>
        <EditFolderModal/>
      </EditModalContext.Provider>
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