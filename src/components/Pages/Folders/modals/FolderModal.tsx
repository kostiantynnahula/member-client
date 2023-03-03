import { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Folder } from 'utils/models/folder';
import { useMutation } from '@apollo/client';
import { UPDATE_FOLDER, FOLDERS } from 'queries/folder';
import { useParams } from 'react-router-dom';

interface IFormValues {
  name: string;
}

interface IFolderModalProps {
  folder?: Folder;
  show: boolean;
  onClose: () => void,
}

export const FolderModal = ({
  folder,
  show,
  onClose,
}: IFolderModalProps) => {

  const { id: folder_id = null } = useParams();

  const [initialValues, setInitialValues] = useState<IFormValues>({
    name: ''
  });

  useEffect(() => {
    setInitialValues({
      name: folder?.name || '',
    });
  }, [folder]);

  const validationSchema = yup.object({
    name: yup.string()
      .trim()
      .required()
  });

  const [ updateFolder ] = useMutation(UPDATE_FOLDER, {
    refetchQueries: [
      {
        query: FOLDERS,
        variables: {
          folder_id
        }
      }
    ]
  });

  const onSubmit = (values: IFormValues) => {
    updateFolder({
      variables: {
        folderData: {
          _id: folder?._id,
          name: values.name,
          parentId: folder_id,
        }
      }
    });
    resetForm();
    onClose();
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
  })

  return (
    <Modal show={show} onHide={() => onClose()}>
      <Modal.Header>
        Edit folder
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
          <Button variant="secondary" onClick={() => onClose()}>Close</Button>
          <Button variant="primary" type='submit'>
            Save
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}