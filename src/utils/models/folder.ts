export interface Folder {
  _id: string;
  name: string;
  closest?: boolean;
}

export interface FoldersListResponse {
  list: Folder[];
  parents: Folder[];
}

export interface CreateFolderResponse {
  createFolder: Folder;
}

export interface FoldersResponse {
  folders: FoldersListResponse;
  files: File[];
}

export interface FolderResponse {
  folder: Folder;
}

export interface BreadcrumbResponse {
  breadcrumb: Folder[];
} 

export interface File {
  _id: string;
  name: string;
  folder_id: string;
}
