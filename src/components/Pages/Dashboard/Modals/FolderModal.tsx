import { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_FOLDER, FOLDERS, FOLDER } from 'queries/folder';
import { CreateFolderResponse, FoldersResponse, Folder } from 'utils/models/folder';
import * as yup from 'yup';
import { IFolderModalProps, IFormValues } from 'components/Pages/Folders/models';
import { useParams } from 'react-router-dom';
import { apolloClient } from 'configs/apolloClient';

export const FolderModal = (props: IFolderModalProps) => {

  const { show, setModalShow } = props;

  const { id: folder_id = null } = useParams();

  const [ parents, setParents ] = useState<Folder[]>([]);
  
  const { data } = useQuery(FOLDER, {
    variables: {
      id: folder_id,
    },
    skip: !folder_id,
  });

  const [createFolder] = useMutation<CreateFolderResponse>(CREATE_FOLDER, {
    refetchQueries: [
      {
        query: FOLDERS,
        variables: {
          folder_id
        }
      }
    ],
  });

  const foldersCache = apolloClient.readQuery<FoldersResponse>({
    query: FOLDERS,
    variables: {
      folder_id
    }
  });

  useEffect(() => {
    const folderParents = foldersCache?.folders.parents
      .map<Folder>(item => ({ _id: item._id, name: item.name })) || [];

    if (data) {
      const { _id, name } = data.folder;
      folderParents.push({ _id, name, closest: true });
    }

    setParents(folderParents);
  }, [data, foldersCache])

  const [initialValues] = useState<IFormValues>({
    name: '',
  });

  const validationSchema = yup.object({
    name: yup.string()
      .trim()
      .required()
  });

  const onSubmit = (values: IFormValues) => {
    const folderData = { ...values, parents };
    createFolder({
      variables: { 
        folderData
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