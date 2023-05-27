import { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Member } from 'utils/models/auth';
import { useFormik } from 'formik';

interface IProps {
  show: boolean,
  setShow: (show: boolean) => void;
  member: Member | null;
  handleEditMember: (member: Member) => void;
}

type IFormValues = Pick<Member, 'role'>;

export const EditMemberModal = ({
  show,
  setShow,
  member,
  handleEditMember,
}: IProps) => {

  const [initialValues, setInitialValues] = useState<IFormValues>({
    role: member?.role || '',
  });

  useEffect(() => {
    if (member) {
      setInitialValues({ role: member.role });
    }
  }, [member])

  const onSubmit = (data: IFormValues) => {
    if (member) {
      handleEditMember({...member, role: data.role});
    }
  };

  const {
    handleSubmit,
    handleChange,
    values,
  } = useFormik({
    onSubmit,
    initialValues,
    enableReinitialize: true,
  });

  return (
    <Modal show={show} onHide={() => setShow(false)} animation={false}>
      <Modal.Header>Member edit</Modal.Header>
      <Form
          noValidate
          onSubmit={handleSubmit}
          autoComplete='off'
        >
        <Modal.Body>
          <Form.Group className='mb-3'>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type='text'
              disabled
              value={member?.username || ''}
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type='text'
              disabled
              value={member?.email || ''}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Role</Form.Label>
            <Form.Select
              name='role'
              value={values.role}
              onChange={handleChange}
            >
              <option value='ADMIN'>Admin</option>
              <option value='MEMBER'>Member</option>
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShow(false)}>Close</Button>
          <Button type='submit'>Submit</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}