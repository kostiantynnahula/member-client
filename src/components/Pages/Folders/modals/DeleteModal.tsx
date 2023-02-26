import { Modal, Form, Button } from 'react-bootstrap';
import { IDeleteModalProps } from 'utils/models/folder/folder-modal';
import { useMutation } from '@apollo/client';
import { DELETE_FOLDER, FOLDERS } from 'queries/folder';
import { DELETE_FILE, FILES } from 'queries/file';
import { useParams } from 'react-router-dom';

export const DeleteModal = ({
  show,
  type,
  data,
  onClose,
}: IDeleteModalProps) => {

  const { id: parent_id = null } = useParams();

  const [deleteFolder] = useMutation(DELETE_FOLDER, {
    refetchQueries: [
      {
        query: FOLDERS,
        variables: {
          parent_id
        }
      }
    ]
  });

  const [deleteFile] = useMutation(DELETE_FILE, {
    refetchQueries: [
      {
        query: FILES,
        variables: {
          parent_id,
        }
      }
    ]
  });

  const handleSubmit = () => {
    if (data) {
      if (type === 'folder') {
        deleteFolder({
          variables: {
            id: data._id,
          }
        });
      }
  
      if (type === 'file') {
        deleteFile({
          variables: {
            id: data._id,
          }
        });
      }
    }

    onClose();
  };
  
  return (
    <Modal show={show} onHide={() => onClose()}>
      <Modal.Header>
        <h4 className='mb-0'>Delete <b>{type}</b></h4>
      </Modal.Header>
      <Form
        noValidate
        onSubmit={handleSubmit}
        autoComplete='off'
      >
        <Modal.Body>
          <p className='mb-0'>Delete the <b>{data?.name}</b> item</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={() => onClose()}>Close</Button>
          <Button variant="primary" type='submit'>
            Delete
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}