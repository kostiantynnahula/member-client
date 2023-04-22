import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';

interface OrganizationModalProps {
  show: boolean,
  setShow: (show: boolean) => void;
}

interface IFormValues {
  name: string;
  description: string;
}

export const OrganizationModal = ({
  show, 
  setShow
}: OrganizationModalProps) => {

  const [initialValues, setInitialValues] = useState<IFormValues>({
    name: '',
    description: '',
  });

  const validationSchema = yup.object({
    name: yup.string()
      .trim()
      .required()
  });

  const onSubmit = (values: IFormValues) => {
    console.log(values, 'on submit');
    setShow(false);
  };

  const {
    handleChange,
    handleSubmit,
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
    <>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Organization Modal</Modal.Title>
        </Modal.Header>
        <Form
          noValidate
          onSubmit={handleSubmit}
          autoComplete='off'
        >
          <Modal.Body>
            <Form.Group className='mb-3'>
              <Form.Label>Name:</Form.Label>
              <Form.Control
                type='text'
                name='name'
                placeholder='Name'
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                isValid={!!errors.name && touched.name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Description:</Form.Label>
              <Form.Control
                as='textarea'
                rows={3}
                name='description'
                placeholder='Description'
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                isValid={!!errors.description && touched.description}
              />
              <Form.Control.Feedback type="invalid">
                {errors.description}
              </Form.Control.Feedback>
            </Form.Group>    
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={() => setShow(false)}>
              Close
            </Button>
            <Button variant='primary' type='submit'>
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}