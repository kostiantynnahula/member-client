import { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Organization } from 'utils/models/auth';
import Select from 'react-select';

export interface IProps {
  organization: Organization;
}

export interface IMemberOption {
  label: string;
  value: string;
}

export interface IFormValues {
  name: string;
  description: string;
  members: IMemberOption[];
}

export const EditForm = ({
  organization
}: IProps) => {
  
  useEffect(() => {
    
    const members = organization.members.map(member => ({ label: member.username, value: member._id }))
    setInitialValues({
      name: organization.name,
      description: organization.description,
      members 
    })
  }, [organization])

  const [initialValues, setInitialValues] = useState<IFormValues>({
    name: '',
    description: '',
    members: [],
  });

  const validationSchema = yup.object({
    name: yup.string().required(),
    description: yup.string().required(),
  });

  const onSubmit = (data: IFormValues) => {
    console.log(data, 'form values');
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
    onSubmit,
    initialValues,
    enableReinitialize: true,
  });

  return (
    <>
      <Form
        noValidate
        onSubmit={handleSubmit}
        autoComplete='off'
      >
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
            isInvalid={!!errors.description && touched.description}
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Select
            isMulti={true}
            value={values.members}
            options={values.members}
          />
        </Form.Group>
        <Form.Group>
          <Button type='submit'>Submit</Button>
        </Form.Group>
      </Form>
    </>
  );
}