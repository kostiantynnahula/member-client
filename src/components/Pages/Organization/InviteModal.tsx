import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';

interface IProps {
  show: boolean,
  setShow: (show: boolean) => void;
  handleInviteMember: (email: string) => void
}

interface IFormValues {
  email: string;
}

export const InviteModal = ({
  show,
  setShow,
  handleInviteMember,
}: IProps) => {

  const [initialValues] = useState<IFormValues>({
    email: '',
  });

  const validationSchema = yup.object({
    email: yup.string().required().email(),
  });

  const onSubmit = (data: IFormValues) => {
    handleInviteMember(data.email);
    resetForm();
    setShow(false);
  }

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    resetForm,
    values,
    errors,
    touched
  } = useFormik({
    validationSchema,
    onSubmit,
    initialValues,
    enableReinitialize: true,
  });

  return (
    <Modal show={show} onHide={() => setShow(false)} animation={false}>
      <Modal.Header>Invite modal</Modal.Header>
      <Form
        noValidate
        autoComplete='off'
        onSubmit={handleSubmit}
      >
        <Modal.Body>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type='text'
              name='email'
              placeholder='Email'
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={!!errors.email && touched.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
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