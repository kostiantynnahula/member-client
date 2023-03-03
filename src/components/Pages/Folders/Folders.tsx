import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { FOLDERS, BREADCRUMB } from 'queries/folder';
import { FoldersResponse, BreadcrumbResponse } from 'utils/models/folder';
import { Row, Col, Spinner, Breadcrumb } from 'react-bootstrap';
import { Folder } from 'components/Pages/Folders/Folder';
import { File } from 'components/Pages/Folders/File';
import { FolderModal } from 'components/Pages/Folders/modals/FolderModal';
import { Folder as FolderModel, File as FileModel } from 'utils/models/folder';
import { FileModal } from 'components/Pages/Folders/modals/FileModal';
import { 
  IFileModalState,
  IFolderModalState,
  IDeleteData,
  IDeleteModalState
} from 'components/Pages/Folders/models';
import { DeleteModal } from 'components/Pages/Folders/modals/DeleteModal';

export const Folders = () => {

  const { id: folder_id = null } = useParams();
  const [ fileModal, setFileModal ] = useState<IFileModalState>({ show: false });
  const [ folderModal, setFolderModal ] = useState<IFolderModalState>({ show: false });
  const [ deleteModal, setDeleteModal ] = useState<IDeleteModalState>({ show: false, type: '' });

  const { loading: folderLoading, data: folderData } = useQuery<FoldersResponse>(FOLDERS, {
    variables: {
      folder_id
    }
  });

  const { data: breadcrumbData } = useQuery<BreadcrumbResponse>(BREADCRUMB, {
    variables: {
      folder_id: folder_id,
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
      {folder_id &&
        <Breadcrumb>
          <Breadcrumb.Item
            linkAs={Link}
            linkProps={{
              to: '/'
            }}
          >Home</Breadcrumb.Item>
          {breadcrumbData?.breadcrumb.map((breadcrumb, i) => (
            <Breadcrumb.Item
              key={i}
              linkAs={Link}
              linkProps={{
                to: `/folder/${breadcrumb._id}`
              }}
              href=''
            >{breadcrumb.name}</Breadcrumb.Item>
          ))}
        </Breadcrumb>
      }
      <div className='mb-2 mt-2'>
        {(folderLoading) && <Row className='text-center'>
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
            {!folderLoading && folderData?.files.map(file => (
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