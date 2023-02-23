import { gql } from '@apollo/client';

export const UPLOAD_FILE = gql`
  mutation uploadFile($data: CreateFileInput!) {
    createOne(createFileInput: $data) {
      _id
      name
    }
  }
`;

export const FILES = gql`
  query files($folder_id: String) {
    files(folder_id: $folder_id) {
      _id
      name
    }
  }
`;