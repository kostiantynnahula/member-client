import { gql } from '@apollo/client';

export const CREATE_FOLDER = gql`
  mutation createFolder($folderData: CreateFolderInput!) {
    createFolder(createFolderInput: $folderData) {
      _id
      name
    }
  }
`;

export const GET_FOLDERS = gql`
  query getFolders($params: GetManyFolderInput!) {
    getFolderList(params: $params) {
      _id
      name
    }
  }
`;