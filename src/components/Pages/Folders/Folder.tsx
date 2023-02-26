import { useState } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { BsFolderFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { Folder as FolderModel } from 'utils/models/folder';
import { IDeleteData } from 'utils/models/folder/folder-modal';
import './FolderItem.scss';

export interface IFolderProp {
  data: FolderModel;
  onEdit: (folder: FolderModel) => void;
  onDelete: (data: IDeleteData, type: string) => void;
}

export const Folder= ({
  data,
  onEdit,
  onDelete,
}: IFolderProp) => {

  const title = (<><BsFolderFill/> {data.name}</>);

  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const onOpenContextMenu = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setMenuOpen(true);
  }

  return (
    <div className='folder-item'>
      <DropdownButton 
        as={Link} 
        title={title}
        show={menuOpen}
        to={`/folder/${data._id}`}
        onToggle={() => setMenuOpen(false)}
        onContextMenu={onOpenContextMenu}
        variant={'outline-primary'}
      >
        <Dropdown.Item onClick={() => onEdit(data)}>Edit</Dropdown.Item>
        <Dropdown.Item onClick={() => onDelete(data, 'folder')}>Delete</Dropdown.Item>
      </DropdownButton>
    </div>
  );   
}