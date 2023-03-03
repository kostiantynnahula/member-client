import { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { FOLDERS, UPLOAD_FILE, UPDATE_FILE } from 'queries/folder';
import { useMutation } from '@apollo/client';
import { File as FileModel } from 'utils/models/folder';
import { useParams } from 'react-router-dom';

export interface IFileModalProps {
  show: boolean;
  file?: FileModel;
  onClose: () => void;
}

export interface IFormValues {
  name: string;
  file: File | null;
}

export const FileModal = (props: IFileModalProps) => {

  const { id: folder_id = null } = useParams();

  const { show, onClose, file } = props;

  const [uploadFile] = useMutation(UPLOAD_FILE, {
    refetchQueries: [
      {
        query: FOLDERS,
        variables: {
          folder_id,
        }
      }
    ]
  });

  const [updateFile] = useMutation(UPDATE_FILE, {
    refetchQueries: [
      {
        query: FOLDERS,
        variables: {
          folder_id,
        }
      }
    ]
  });

  const [initialValues, setInitialValues] = useState<IFormValues>({
    name: '',
    file: null,
  });

  const validationSchema = yup.object({
    name: yup.string()
      .trim()
      .required()
  });

  useEffect(() => {
    setInitialValues({
      name: file?.name || '',
      file: null,
    })
  }, [file])


  const onSubmit = (values: IFormValues) => {
    if (file) {
      updateFile({
        variables: {
          updateFileInput: {
            _id: file._id,
            name: values.name,
          }
        }
      });
    } else {
      uploadFile({
        variables: {
          data: {
            ...values,
            folder_id,
          },
        }
      });
    }
    resetForm();
    onClose();
  }

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    setFieldValue,
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

  const onSelectFile = (e: any) => {
    const [file] = e.currentTarget.files;
    setFieldValue('file', file);
    setFieldValue('name', file.name);
  }

  return (
    <Modal show={show} onHide={() => onClose()} animation={false}>
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
          {!file && <Form.Group className='mb-3'>
            <Form.Label>File:</Form.Label>
            <Form.Control 
              type='file'
              name='file'
              onChange={onSelectFile}
            />
          </Form.Group>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => onClose()}>
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