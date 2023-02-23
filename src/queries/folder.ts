import { gql } from '@apollo/client';

export const CREATE_FOLDER = gql`
  mutation createFolder($folderData: CreateFolderInput!) {
    createFolder(createFolderInput: $folderData) {
      _id
      name
    }
  }
`;

export const FOLDERS = gql`
  query getFolders($parent_id: String) {
    folders(parent_id: $parent_id) {
      _id
      name
    }
  }
`;

export const DELETE_FOLDER = gql`
  mutation deleteFolder($id: String!) {
    deleteFolder(id: $id) {
      _id  
    }
  }
`;

export const UPDATE_FOLDER = gql`
  mutation updateFolder($folderData: UpdateFolderInput!) {
    updateFolder(updateFolderInput: $folderData) {
      _id
      name
    }
  }
`;