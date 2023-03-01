import { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useMutation } from '@apollo/client';
import { CREATE_FOLDER, FOLDERS } from 'queries/folder';
import { CreateFolderResponse } from 'utils/models/folder';
import * as yup from 'yup';
import { IFolderModalProps, IFormValues } from 'components/Pages/Folders/models';
import { useParams } from 'react-router-dom';

export const FolderModal = (props: IFolderModalProps) => {

  const { show, setModalShow } = props;

  const { id: parent_id = null } = useParams();
  
  const [createFolder] = useMutation<CreateFolderResponse>(CREATE_FOLDER, {
    refetchQueries: [
      {
        query: FOLDERS,
        variables: {
          parent_id
        }
      }
    ],
  })

  const [initialValues] = useState<IFormValues>({
    name: '',
  });

  const validationSchema = yup.object({
    name: yup.string()
      .trim()
      .required()
  });

  const onSubmit = (values: IFormValues) => {
    createFolder({
      variables: { 
        folderData: { ...values, parent_id }
      }
    });
    setModalShow(false);
    resetForm();
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
        <Modal.Title>Create Folder</Modal.Title>
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModalShow(false)}>Close</Button>
          <Button variant="primary" type='submit'>
            Save
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}