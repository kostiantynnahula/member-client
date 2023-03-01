export interface Folder {
  _id: string;
  name: string;
}

export interface CreateFolderResponse {
  createFolder: Folder;
}

export interface FoldersResponse {
  folders: Folder[];
  files: File[];
}

export interface BreadcrumbResponse {
  breadcrumb: Folder[];
} 

export interface File {
  _id: string;
  name: string;
  folder_id: string;
}
