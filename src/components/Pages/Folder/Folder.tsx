import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_FOLDERS } from 'queries/folder';
import { GetFoldersResponse } from 'utils/models/folder';
import { Row, Col, Spinner } from 'react-bootstrap';
import { FolderItem } from 'components/Pages/Folder/FolderItem';
import { File } from 'components/Pages/Folder/File';
import { EditFolderModal } from 'components/Pages/Folder/EditFolderModal';
import { IEditFolderModalContext } from 'utils/models/folder/folder-modal';
import { EditModalContext, defaultContext } from 'components/Pages/Folder/context/editModalContext';
import { GET_FILES } from 'queries/file';
import { GetFilesResponse } from 'utils/models/file';

export const Folder = () => {

  const { id: parent_id = null } = useParams();

  const { loading, data } = useQuery<GetFoldersResponse>(GET_FOLDERS, {
    variables: {
      params: {
        parent_id,
      }
    }
  });

  const { loading: fileLoading, data: files } = useQuery<GetFilesResponse>(GET_FILES, {
    variables: {
      params: {
        page: 1,
        limit: 100,
      }
    }
  });

  const [ context, setContext ] = useState<IEditFolderModalContext>(defaultContext);

  return (
    <EditModalContext.Provider value={{ context, setContext }}>
      <div className='mb-2 mt-2'>
        {loading && <Row className='text-center'>
            <Col>
              <Spinner variant='primary'/>
            </Col>
          </Row>
        }
        <Row>
          {!loading && data?.folderList.map((folder) => (
            <Col xs={2} key={folder._id}>
              <FolderItem
                id={folder._id}
                name={folder.name}
              />
            </Col>
          ))}
          {!loading && !data?.folderList.length && <>
            <p className='text-center'>Folder is empty</p>
          </>}
        </Row>
        <hr/>
        <div className='mb-2 mt-2'>
          <Row>
            {!fileLoading && files?.getMany.map(file => (
              <Col xs={2} key={file._id}>
                <File {...file}/>
              </Col>
            ))}
          </Row>
        </div>
      </div>
      <EditFolderModal/>
    </EditModalContext.Provider>
  );   
}