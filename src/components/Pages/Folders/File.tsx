import { useState } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { BsFillFileEarmarkFill } from 'react-icons/bs';
import { File as FileModel } from 'utils/models/folder';
import { IDeleteData } from 'components/Pages/Folders/models';

interface IFileProps {
  data: FileModel;
  onEdit: (data: FileModel) => void;
  onDelete: (data: IDeleteData, type: string) => void;
  onPreview: () => void;
}

export const File = ({
  data,
  onEdit,
  onDelete,
  onPreview
}: IFileProps) => {
  
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const title = (
    <div className='d-flex pt-2 pb-2'>
      <div className='mr-1'>
        <BsFillFileEarmarkFill/>
      </div>
      <div className='overflow-hidden ellips-overflow'>
        <span>{data.name}</span>
      </div>
    </div>
  );

  const onOpenContextMenu = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setMenuOpen(true);
  }

  const onDownload = (data: FileModel) => {
    window.open(data.location, '_blank');
  }

  const [mimetype] = data.mimetype.split('/');

  const isPreviewFile = ['image', 'video'].includes(mimetype); 

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
        <Dropdown.Item onClick={() => onDownload(data)}>Download</Dropdown.Item>
        {isPreviewFile && <Dropdown.Item onClick={() => onPreview()}>Prview</Dropdown.Item>}
      </DropdownButton>
    </div>
  );
}