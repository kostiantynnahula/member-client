import { useState, useEffect } from 'react';
import { Row, Col, Button, Form, Spinner } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { AuthProfileCache, UpdateProfileCache } from 'utils/models/auth';
import { useMutation, useQuery } from '@apollo/client';
import { GET_AUTH_PROFILE, UPDATE_PROFILE } from 'queries/auth';
import { Link } from 'react-router-dom';

interface IFormValues {
  email: string;
  username: string;
}

export const Profile = () => {

  const { data: userData, loading: queryProfileLoading } = useQuery<AuthProfileCache>(GET_AUTH_PROFILE);
  const [ updateProfile, { loading: mutatioProfileLoading } ] = useMutation<UpdateProfileCache>(UPDATE_PROFILE);

  const [initialValues, setInitialValues] = useState<IFormValues>({
    email: '',
    username: '',
  });

  const validationSchema = yup.object({
    email: yup.string()
      .trim()
      .email()
      .required(),
    username: yup.string()
      .trim()
      .required()
  });

  useEffect(() => {
    if (userData?.profile) {
      setInitialValues({
        email: userData.profile.email,
        username: userData.profile.username
      });
    }
  }, [userData])

  const onSubmit = (values: IFormValues) => {
    updateProfile({
      variables: {
        updateProfilePayload: {
          ...values
        }
      }
    });
  };

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    errors,
    touched,
  } = useFormik({
    validationSchema,
    onSubmit,
    initialValues,
    enableReinitialize: true
  });

  return (
    <>
      <h3>Profile</h3>
      <hr/>
      <div>
        { (queryProfileLoading || mutatioProfileLoading) && <Row className='text-center'>
          <Col>
            <Spinner variant='primary'/>
          </Col>  
        </Row>}
        { !queryProfileLoading && !mutatioProfileLoading && 
          <Row>
            <Col>
              <Form
                noValidate
                onSubmit={handleSubmit}
                autoComplete='off'
              >
                  <Row>
                    <Col xs={6}>
                      <Form.Group className='mb-3'>
                        <Form.Label>Username:</Form.Label>
                        <Form.Control 
                          type='text'
                          name='username'
                          placeholder='username'
                          value={values.username}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={!!errors.username && touched.username}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.username}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={6}>
                      <Form.Group className='mb-3'>
                        <Form.Label>Email:</Form.Label>
                        <Form.Control 
                          type='text'
                          name='email'
                          placeholder='email'
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={!!errors.email && touched.email}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.email}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={6}>
                      <Link 
                        to='/'
                        className='btn btn-outline-primary'
                        style={{ marginRight: 10 }}
                      >Back</Link>
                      <Button 
                        variant='primary' 
                        type='submit'
                      >Submit</Button>
                    </Col>
                  </Row>
              </Form>
            </Col>
          </Row>          
        }
      </div>
    </>
  )
}