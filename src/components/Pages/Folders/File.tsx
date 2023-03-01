import { useState } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { BsFillFileEarmarkFill } from 'react-icons/bs';
import { File as FileModel } from 'utils/models/folder';
import { IDeleteData } from 'components/Pages/Folders/models';

interface IFileProps {
  data: FileModel;
  onEdit: (data: FileModel) => void;
  onDelete: (data: IDeleteData, type: string) => void;
}

export const File = ({
  data,
  onEdit,
  onDelete,
}: IFileProps) => {
  
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const title = (<><BsFillFileEarmarkFill/><span>{data.name}</span></>);

  const onOpenContextMenu = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setMenuOpen(true);
  }

  return (
    <div className='file-item mt-1 mb-1'>
      <DropdownButton
        title={title}
        show={menuOpen}
        onToggle={() => setMenuOpen(false)}
        onContextMenu={onOpenContextMenu}
      >
        <Dropdown.Item onClick={() => onEdit(data)}>Edit</Dropdown.Item>
        <Dropdown.Item onClick={() => onDelete(data, 'file')}>Delete</Dropdown.Item>
      </DropdownButton>
    </div>
  );
}