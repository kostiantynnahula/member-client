import { Modal, Button } from 'react-bootstrap';
import { IPreviewModalProps } from 'components/Pages/Folders/models';

export const PreviewModal = ({
  show,
  file,
  onClose
}: IPreviewModalProps) => {
  return (
    <Modal show={show} size='xl' animation={false}>
      <Modal.Body>
        {file?.mimetype.split('/').includes('image') && 
          <img src={file.location} alt="" className='w-100' />
        }
        {file?.mimetype.split('/').includes('video') && 
          <video src={file.location} className='w-100' controls />
        }
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={onClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}