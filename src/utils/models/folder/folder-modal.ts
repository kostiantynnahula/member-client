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
