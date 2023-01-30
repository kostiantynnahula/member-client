import { useState, useContext } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { BsFolderFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { IFolderItemProp } from './interfaces';
import { ConfirmModalContext } from './../../Layout/Root/Root';
import { DELETE_FOLDER, GET_FOLDERS } from './../../../queries/folder';
import { useMutation } from '@apollo/client';
import './FolderItem.scss';

export const FolderItem = (prop: IFolderItemProp) => {

  const title = (<><BsFolderFill/> {prop.name}</>);

  const { context, setContext } = useContext(ConfirmModalContext);

  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const [ deleteFolder ] = useMutation<any>(DELETE_FOLDER, {
    refetchQueries: [
      {
        query: GET_FOLDERS,
        variables: {
          params: {
            page: 1,
            limit: 100
          }
        }
      }
    ]
  });

  const onOpenContextMenu = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setMenuOpen(true);
  }

  const onEditFolder = () => {
    console.log('on edit folder');
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
        to={`folder/${prop.id}`}
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