import { Button } from 'react-bootstrap';
import { BsFolderFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { IFolderItemProp } from './interfaces';

export const FolderItem = (prop: IFolderItemProp) => {
  return (
    <>
      <Link
        to={`folder/${prop.id}`}
        className='btn btn-outline-primary'
      >
        <BsFolderFill/> {prop.name}
      </Link>
    </>
  );   
}