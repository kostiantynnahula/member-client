import { Modal, Button } from 'react-bootstrap';
import { Member } from 'utils/models/auth';

interface IProps {
  show: boolean;
  member: Member | null;
  setShow: (show: boolean) => void;
  onSubmit: () => void;
}

export const DeleteModal = ({
  show,
  member,
  setShow,
  onSubmit
}: IProps) => {

  const handleSubmit = () => {
    onSubmit();
    setShow(false);
  }

  return (
    <div>
      <Modal show={show} onHid={() => setShow(false)} animation={false}>
        <Modal.Header>Delete member</Modal.Header>
        <Modal.Body>
          Do you want to delete member {member?.username} ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant='outline-danger' onClick={() => setShow(false)}>Close</Button>
          <Button variant='outline-primary' onClick={handleSubmit}>Submit</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}