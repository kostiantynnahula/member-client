import { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';

export interface IFileModalProps {
  show: boolean;
  setModalShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IFormValues {
  name: string;
  file: File | null;
}

export const FileModal = (props: IFileModalProps) => {

  const { show, setModalShow } = props;

  const [initialValues, setInitialValues] = useState<IFormValues>({
    name: '',
    file: null,
  });

  const validationSchema = yup.object({
    name: yup.string()
      .trim()
      .required()
  });

  const onSubmit = (values: IFormValues) => {
    console.log(values, 'on submit file');
    console.log(values.file?.size, 'file')
  }

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    resetForm,
    values,
    errors,
    touched,
  } = useFormik({
    validationSchema,
    onSubmit: onSubmit,
    initialValues: initialValues,
    enableReinitialize: true,
  });

  return (
    <Modal show={show} onHide={() => setModalShow(false)} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>File upload</Modal.Title>
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
              isInvalid={!!errors.name && touched.name}
              />
            <Form.Control.Feedback type="invalid">
              {errors.name}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>File:</Form.Label>
            <Form.Control 
              type='file'
              name='file'
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModalShow(false)}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Save
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}