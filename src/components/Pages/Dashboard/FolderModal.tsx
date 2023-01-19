import { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';

export interface IFolderModalProps {
  show: boolean;
  setModalShow: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IFormValues {
  name: string;
}

export const FolderModal = (props: IFolderModalProps) => {

  const { show, setModalShow } = props;
  
  const [initialValues] = useState<IFormValues>({
    name: ''
  });

  const validationSchema = yup.object({
    name: yup.string()
      .trim()
      .required()
  });


  const onSubmit = (values: IFormValues) => {
    console.log('on submit folder', values);
  }

  const {
    handleSubmit,
    handleChange,
    handleBlur,
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
        <Modal.Title>Folder modal</Modal.Title>
      </Modal.Header>
      <Form
          noValidate
          onSubmit={handleSubmit}
          autoComplete='off'
        >
        <Modal.Body>
          <Form.Group className='mb-3'>
            <Form.Label>Folder name:</Form.Label>
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModalShow(false)}>Close</Button>
          <Button variant="primary" type='submit'>
            Save Changes
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}