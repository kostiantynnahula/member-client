import { useContext } from 'react';
import { Modal, Button} from 'react-bootstrap';
import { ConfirmModalContext } from 'components/Layout/Root/Root';

export const ConfirmModal = () => {

  const { context, setContext } = useContext(ConfirmModalContext)

  const { show, details, onSubmit } = context;

  const setShow = (show: boolean) => {
    setContext({ ...context, show })
  }

  return (
    <Modal show={show} onHide={() => setShow(false)} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>{details.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {details.description}
      </Modal.Body>
      <Modal.Footer>
        <Button 
          variant="secondary"
          onClick={() => setShow(false)}
        >Close</Button>
        <Button 
          variant="primary"
          type='submit'
          onClick={onSubmit}
        >
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}