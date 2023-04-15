import { gql } from '@apollo/client';

export const CREATE_FOLDER = gql`
  mutation createFolder($folderData: CreateFolderInput!) {
    createFolder(createFolderInput: $folderData) {
      _id
      name
    }
  }
`;

export const FOLDER = gql`
  query getFolder($id: String!) {
    folder(id: $id) {
      _id
      name
    }
  }
`;

export const FOLDERS = gql`
  query getFolders($folder_id: String) {
    folders(folder_id: $folder_id) {
      list {
        _id
        name
      }
      parents {
        _id
        name
      }
    },
    files(folder_id: $folder_id) {
      _id
      name
      location
      key
      mimetype
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

export const UPLOAD_FILE = gql`
  mutation uploadFile($data: UploadFileInput!) {
    uploadFile(uploadFileInput: $data) {
      _id
      name
    }
  }
`;

export const UPDATE_FILE = gql`
  mutation updateFile($updateFileInput: UpdateFileInput!) {
    updateFile(updateFileInput: $updateFileInput) {
      _id
      name
    }
  }
`;

export const DELETE_FILE = gql`
  mutation deleteFile($id: String!) {
    deleteFile(id: $id) {
      _id
    }
  }
`