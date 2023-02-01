import { useState, useContext, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { EditModalContext } from './Dashboard';
import { useMutation } from '@apollo/client';
import { UPDATE_FOLDER, GET_FOLDERS } from './../../../queries/folder';

interface IFormValues {
  name: string;
}

export const EditFolderModal = () => {

  const { context, setContext } = useContext(EditModalContext);

  const [initialValues, setInitialValues] = useState<IFormValues>({
    name: ''
  });

  useEffect(() => {
    setInitialValues(context.data);
  }, [context]);

  const validationSchema = yup.object({
    name: yup.string()
      .trim()
      .required()
  });

  const onSubmit = (values: IFormValues) => {
    context.onSubmit(values);
    setContext({ ...context, show: false });
  }

  const onClose = () => {
    setContext({ ...context, show: false })
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
  })

  return (
    <Modal show={context.show} onHide={() => onClose()}>
      <Modal.Header>
        Folder modal
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
          <Button variant="secondary" onClick={() => onClose()}>Close</Button>
          <Button variant="primary" type='submit'>
            Save Changes
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}