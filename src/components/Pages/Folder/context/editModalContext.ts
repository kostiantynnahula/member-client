import { createContext } from 'react';
import { IEditFolderModalContext } from 'utils/models/folder/folder-modal';

export const defaultContext = {
  show: false,
  data: {
    name: ''
  },
  onSubmit: (data?: any) => {},
};

export const EditModalContext = createContext({
  context: defaultContext,
  setContext: (context: IEditFolderModalContext) => {}
});