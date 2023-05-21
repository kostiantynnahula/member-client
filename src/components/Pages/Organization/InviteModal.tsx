import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { CREATE_INVITE } from 'queries/invite';
import { useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';

interface IProps {
  show: boolean,
  setShow: (show: boolean) => void;
}

interface IFormValues {
  email: string;
}

export const InviteModal = ({
  show,
  setShow,
}: IProps) => {

  const { orgId } = useParams();

  const [initialValues] = useState<IFormValues>({
    email: '',
  });

  const validationSchema = yup.object({
    email: yup.string().required().email(),
  });

  const [createInvite] = useMutation(CREATE_INVITE);

  const onSubmit = (data: IFormValues) => {
    createInvite({
      variables: {
        inviteData: {
          email: data.email,
          orgId
        }
      }
    });
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
          <Button variant='outline-danger' onClick={() => setShow(false)}>Close</Button>
          <Button variant='outline-primary' type='submit'>Submit</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}