import { gql } from '@apollo/client';

export const UPLOAD_FILE = gql`
  mutation uploadFile($data: CreateFileInput!) {
    createOne(createFileInput: $data) {
      _id
      name
    }
  }
`