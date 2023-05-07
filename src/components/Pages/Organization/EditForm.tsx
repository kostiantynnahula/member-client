import { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Organization, Member } from 'utils/models/auth';
import { UPDATE_ORGANIZATION, ORGANIZATION } from 'queries/organization';
import { useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { EditMemberModal } from './EditMemberModal';
import { InviteModal } from './InviteModal';
import { DeleteModal } from './DeleteModal';

export interface IProps {
  organization: Organization;
}

interface IFormValues {
  name: string;
  description: string;
  members: Member[];
}

export const EditForm = ({
  organization
}: IProps) => {
  
  const { orgId } = useParams();

  useEffect(() => {
    setInitialValues({
      name: organization.name,
      description: organization.description,
      members: organization.members,
    });
  }, [organization]);

  const [updateOrganization] = useMutation(UPDATE_ORGANIZATION, {
    refetchQueries: [
      {
        query: ORGANIZATION,
        variables: {
          id: orgId
        }
      }
    ]
  });

  const [memberModal, setMemberModal] = useState<boolean>(false);  
  const [editMember, setEditMember] = useState<Member | null>(null);
  const [inviteModal, setInviteModal] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [deleteMember, setDeleteMember] = useState<Member | null>(null);

  const onEditMember = (member: Member) => {
    setMemberModal(true);
    setEditMember(member);
  }

  const onDeleteMember = (member: Member) => {
    setDeleteModal(true);
    setDeleteMember(member);
  };

  const handleEditMember = (member: Member) => {
    console.log(member, 'handle edit member');
  }

  const handleDeleteMember = () => {
    console.log(deleteMember, 'handle delete member');
  }

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
    updateOrganization({
      variables: {
        updateOrganizationInput: {
          name: data.name,
          description: data.description,
        },
        id: orgId,
      }
    });
    resetForm();
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
          <Form.Control.Feedback type="invalid">
            {errors.name}
          </Form.Control.Feedback>
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
          <Form.Control.Feedback type="invalid">
            {errors.description}
            </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className='mb-3'>
          <ul>
            {organization.members.map((member, key) => (
              <li key={key}>
                <>
                  {member.username} <i>({member.email})</i> - <b>[{member.role}]</b> 
                  <Button 
                    variant='outline-primary'
                    className='m-1'
                    onClick={() => onEditMember(member)}
                  >Edit</Button>
                  <Button 
                    variant='outline-danger'
                    onClick={() => onDeleteMember(member)}
                  >Delete</Button>
                </>
              </li>
            ))}
          </ul>
        </Form.Group>
        <Form.Group>
          <Button type='submit'>Submit</Button>
        </Form.Group>
      </Form>
      <hr/>
      <div>
        <h3>Invites</h3>
        <p className='text-center'>Invites list is empty</p>
        <Button   
          variant='outline-primary'
          onClick={() => setInviteModal(true)}
        >Invite new</Button>
      </div>
      <EditMemberModal
        show={memberModal}
        setShow={setMemberModal}
        member={editMember}
        handleEditMember={handleEditMember}
      />
      <InviteModal
        show={inviteModal}
        setShow={setInviteModal}
      />
      <DeleteModal
        show={deleteModal}
        setShow={setDeleteModal}
        onSubmit={handleDeleteMember}
        member={deleteMember}
      />
    </>
  );
}