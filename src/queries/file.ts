import { gql } from '@apollo/client';

export const UPLOAD_FILE = gql`
  mutation uploadFile($data: CreateFileInput!) {
    createOne(createFileInput: $data) {
      _id
      name
    }
  }
`;

export const GET_FILES = gql`
  query getFiles($params: GetManyFileInput!) {
    getMany(params: $params) {
      _id
      name
    }
  }
`;