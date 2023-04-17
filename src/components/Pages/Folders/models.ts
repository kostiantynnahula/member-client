import { Folder, File } from 'utils/models/folder';

export interface IFolderModalProps {
  show: boolean;
  setModalShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IFormValues {
  name: string;
}

export interface IEditFolderModalContext {
  show: boolean,
  data: {
    name: string,
  }
  onSubmit: (data?: any) => void
}

export interface IFileModalState {
  show: boolean;
  file?: File;
}

export interface IFolderModalState {
  show: boolean;
  folder?: Folder;
}

export interface IDeleteData {
  _id: string;
  name: string;
}

export interface IDeleteModalState {
  data?: IDeleteData;
  show: boolean;
  type?: string;
}

export interface IDeleteModalProps {
  show: boolean;
  type?: string;
  data?: IDeleteData;
  onClose: () => void;
}

export interface IPreviewModalState {
  show: boolean;
  file?: File;
}

export interface IPreviewModalProps extends IPreviewModalState {
  onClose: () => void;
}