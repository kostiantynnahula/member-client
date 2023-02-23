import { useState } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { BsFillFileEarmarkFill } from 'react-icons/bs';
import { File as FileResponse } from 'utils/models/file';

export const File = (data: FileResponse) => {
  
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const title = (<><BsFillFileEarmarkFill/><span>{data.name}</span></>);

  const onOpenContextMenu = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setMenuOpen(true);
  }

  const onEdit = () => {
    console.log('on edit');
  }

  const onDelete = () => {
    console.log('on delete');
  }

  return (
    <div className='file-item mt-1 mb-1'>
      <DropdownButton
        title={title}
        show={menuOpen}
        onToggle={() => setMenuOpen(false)}
        onContextMenu={onOpenContextMenu}
      >
        <Dropdown.Item onClick={onEdit}>Edit</Dropdown.Item>
        <Dropdown.Item onClick={onDelete}>Delete</Dropdown.Item>
      </DropdownButton>
    </div>
  );
}