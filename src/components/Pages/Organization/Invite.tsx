import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useParams } from 'react-router-dom';

interface IFormValues {
  secret: string;
}

export const Invite = () => {
  
  const { token } = useParams();

  const [initialValues] = useState<IFormValues>({
    secret: '',
  });

  const validationSchema = yup.object({
    secret: yup.string().required(),
  });

  const onSubmit = (data: IFormValues) => {
    console.log('on submit');
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
    <div>
      <h3>Invite form</h3>
      <Form
        noValidate
        autoComplete='off'
        onSubmit={handleSubmit}
      >
        <Form.Group className='mb-3'>
          <Form.Label>Secret</Form.Label>
          <Form.Control
            type='text'
            name='secret'
            placeholder='Secret'
            value={values.secret}
            onChange={handleChange}
            onBlur={handleBlur}
            isInvalid={!!errors.secret && touched.secret}
          />
           <Form.Control.Feedback type="invalid">
            {errors.secret}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Button variant='outline-primary'>Submit</Button>
        </Form.Group>
      </Form>
    </div>
  );
}