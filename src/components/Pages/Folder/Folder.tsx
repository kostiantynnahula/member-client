import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_FOLDERS } from './../../../queries/folder';
import { GetFoldersResponse } from './../../../utils/models/folder';
import { Row, Col, Spinner } from 'react-bootstrap';
import { FolderItem } from './../Folder/FolderItem';
import { File } from './../Folder/File';

export const Folder = () => {

  const { id: parent_id = null } = useParams();

  const { loading, data } = useQuery<GetFoldersResponse>(GET_FOLDERS, {
    variables: {
      params: {
        parent_id,
      }
    }
  });

  return (
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
          <Col xs={2}>
            <File/>
          </Col>
        </Row>
      </div>
    </div>
  );   
}