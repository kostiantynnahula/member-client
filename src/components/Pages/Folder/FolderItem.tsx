import { useState } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { BsFolderFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { IFolderItemProp } from './interfaces';
import './FolderItem.scss';

export const FolderItem = (prop: IFolderItemProp) => {

  const title = (<><BsFolderFill/> {prop.name}</>);

  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const onOpenContextMenu = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setMenuOpen(true);
  }

  const onEditFolder = () => {
    console.log('on edit folder');
  }

  const onDeleteFolder = () => {
    console.log('on delete folder');
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