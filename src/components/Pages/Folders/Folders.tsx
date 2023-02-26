import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { FOLDERS } from 'queries/folder';
import { FoldersResponse } from 'utils/models/folder';
import { Row, Col, Spinner } from 'react-bootstrap';
import { Folder } from 'components/Pages/Folders/Folder';
import { File } from 'components/Pages/Folders/File';
import { FolderModal } from 'components/Pages/Folders/modals/FolderModal';
import { FILES } from 'queries/file';
import { FilesResponse, File as FileModel } from 'utils/models/file';
import { Folder as FolderModel } from 'utils/models/folder';
import { FileModal } from 'components/Pages/Folders/modals/FileModal';
import { 
  IFileModalState,
  IFolderModalState,
  IDeleteData,
  IDeleteModalState
} from 'utils/models/folder/folder-modal';
import { DeleteModal } from 'components/Pages/Folders/modals/DeleteModal';

export const Folders = () => {

  const { id: parent_id = null } = useParams();
  const [ fileModal, setFileModal ] = useState<IFileModalState>({ show: false });
  const [ folderModal, setFolderModal ] = useState<IFolderModalState>({ show: false });
  const [ deleteModal, setDeleteModal ] = useState<IDeleteModalState>({ show: false, type: '' });

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

  const onEditFile = (file: FileModel) => {
    setFileModal({ show: true, file });
  }

  const onEditFolder = (folder: FolderModel) => {
    setFolderModal({ show: true, folder });
  }

  const onDeleteData = (data: IDeleteData, type: string) => {
    setDeleteModal({ show: true, type, data });
  }

  return (
    <>
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
                data={folder}
                onEdit={onEditFolder}
                onDelete={onDeleteData}
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
                  onDelete={onDeleteData}
                />
              </Col>
            ))}
          </Row>
        </div>
      </div>
      <FolderModal
        show={folderModal.show}
        folder={folderModal.folder}
        onClose={() => setFolderModal({ show: false })}
      />
      <FileModal 
        show={fileModal.show}
        file={fileModal.file}
        onClose={() => setFileModal({ show: false })}
      />
      <DeleteModal
        type={deleteModal.type}
        show={deleteModal.show}
        data={deleteModal.data}
        onClose={() => setDeleteModal({ show: false })}
      />
    </>
  );   
}