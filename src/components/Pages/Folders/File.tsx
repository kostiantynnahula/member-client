import { useState } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { BsFillFileEarmarkFill } from 'react-icons/bs';
import { File as FileModel } from 'utils/models/file';

interface IFileProps {
  data: FileModel;
  onEdit: (data: FileModel) => void;
}

export const File = (props: IFileProps) => {
  
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const title = (<><BsFillFileEarmarkFill/><span>{props.data.name}</span></>);

  const onOpenContextMenu = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setMenuOpen(true);
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
        <Dropdown.Item onClick={() => props.onEdit(props.data)}>Edit</Dropdown.Item>
        <Dropdown.Item onClick={onDelete}>Delete</Dropdown.Item>
      </DropdownButton>
    </div>
  );
}