import { Modal, Button } from 'react-bootstrap';

export interface IFileModalProps {
  show: boolean;
  setModalShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export const FileModal = (props: IFileModalProps) => {

  const { show, setModalShow } = props;

  const onSubmit = () => {
    console.log('on submit file');
  }

  return (
    <Modal show={show} onHide={() => setModalShow(false)} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>File modal</Modal.Title>
      </Modal.Header>
      <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setModalShow(false)}>
          Close
        </Button>
        <Button variant="primary" onClick={onSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}