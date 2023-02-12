import { useState, useContext } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { BsFolderFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { IFolderItemProp } from './interfaces';
import { ConfirmModalContext } from 'components/Layout/Root/Root';
import { EditModalContext } from 'components/Pages/Dashboard/Dashboard';
import { DELETE_FOLDER, GET_FOLDERS, UPDATE_FOLDER } from 'queries/folder';
import { useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';
import './FolderItem.scss';

export const FolderItem = (prop: IFolderItemProp) => {

  const { id: parent_id = null } = useParams();

  const title = (<><BsFolderFill/> {prop.name}</>);

  const { context, setContext } = useContext(ConfirmModalContext);
  
  const { setContext: setEditContext } = useContext(EditModalContext);

  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const [ deleteFolder ] = useMutation<any>(DELETE_FOLDER, {
    refetchQueries: [
      {
        query: GET_FOLDERS,
        variables: {
          params: {
            parent_id
          }
        }
      }
    ]
  });

  const [ updateFolder ] = useMutation(UPDATE_FOLDER, {
    refetchQueries: [
      {
        query: GET_FOLDERS,
        variables: {
          params: {
            parent_id
          }
        }
      }
    ]
  })

  const onOpenContextMenu = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setMenuOpen(true);
  }

  const onEditFolder = () => {
    setEditContext({
      show: true,
      data: {
        name: prop.name
      },
      onSubmit: (data) => onSubmitEditFolder(data),
    });
  }

  const onSubmitEditFolder = (data: IFolderItemProp) => {
    updateFolder({
      variables: {
        folderData: { ...data, _id: prop.id }
      }
    });
  }

  const onDeleteFolder = () => {
    setContext({
      show: true,
      details: {
        title: 'Delete folder',
        description: 'Are you sure?'
      },
      onSubmit: () => onConfirmDeleteFolder(),
    });
  }

  const onConfirmDeleteFolder = () => {
    deleteFolder({
      variables: {
        id: prop.id
      }
    });

    setContext({ ...context, show: false })
  }
  
  return (
    <div className='folder-item'>
      <DropdownButton 
        as={Link} 
        title={title}
        show={menuOpen}
        to={`/folder/${prop.id}`}
        onToggle={() => setMenuOpen(false)}
        onContextMenu={onOpenContextMenu}
        variant={'outline-primary'}
      >
        <Dropdown.Item onClick={onEditFolder}>Edit</Dropdown.Item>
        <Dropdown.Item onClick={onDeleteFolder}>Delete</Dropdown.Item>
      </DropdownButton>
    </div>
  );   
}