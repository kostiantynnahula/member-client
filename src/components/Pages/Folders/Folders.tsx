import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { FOLDERS } from 'queries/folder';
import { FoldersResponse } from 'utils/models/folder';
import { Row, Col, Spinner } from 'react-bootstrap';
import { Folder } from 'components/Pages/Folders/Folder';
import { File } from 'components/Pages/Folders/File';
import { EditFolderModal } from 'components/Pages/Folders/modals/EditFolderModal';
import { IEditFolderModalContext } from 'utils/models/folder/folder-modal';
import { EditModalContext, defaultContext } from 'components/Pages/Folders/context/editModalContext';
import { FILES } from 'queries/file';
import { FilesResponse, File as FileModel } from 'utils/models/file';
import { FileModal } from 'components/Pages/Folders/modals/FileModal';

interface IFileModalProps {
  show: boolean;
  file?: FileModel;
}

export const Folders = () => {

  const { id: parent_id = null } = useParams();
  const [ fileModal, setFileModal ] = useState<IFileModalProps>({ show: false });

  const { loading: folderLoading, data: folderData } = useQuery<FoldersResponse>(FOLDERS, {
    variables: {
      parent_id
    }
  });

  const { loading: fileLoading, data: filesData } = useQuery<FilesResponse>(FILES, {
    variables: {
      folder_id: parent_id
    }
  });

  const [ context, setContext ] = useState<IEditFolderModalContext>(defaultContext);

  const onEditFile = (file: FileModel) => {
    setFileModal({ show: true, file });
  }

  return (
    <EditModalContext.Provider value={{ context, setContext }}>
      <div className='mb-2 mt-2'>
        {(folderLoading || fileLoading) && <Row className='text-center'>
            <Col>
              <Spinner variant='primary'/>
            </Col>
          </Row>
        }
        <Row>
          {!folderLoading && folderData?.folders.map((folder) => (
            <Col xs={2} key={folder._id}>
              <Folder
                id={folder._id}
                name={folder.name}
              />
            </Col>
          ))}
          {!folderLoading && !folderData?.folders.length && <>
            <p className='text-center'>Folder is empty</p>
          </>}
        </Row>
        <hr/>
        <div className='mb-2 mt-2'>
          <Row>
            {!fileLoading && filesData?.files.map(file => (
              <Col xs={2} key={file._id}>
                <File
                  data={file}
                  onEdit={onEditFile}
                />
              </Col>
            ))}
          </Row>
        </div>
      </div>
      <EditFolderModal/>
      <FileModal 
        show={fileModal.show}
        onClose={() => setFileModal({
          show: false,
        })}
        file={fileModal.file}
      />
    </EditModalContext.Provider>
  );   
}