export interface File {
  _id: string;
  name: string;
  folder_id: string;
}

export interface GetFilesResponse {
  getMany: File[];
}