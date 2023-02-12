export interface Folder {
  _id: string;
  name: string;
}

export interface CreateFolderResponse {
  createFolder: Folder;
}

export interface GetFoldersResponse {
  folderList: Folder[];
}