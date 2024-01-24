export type setLoadingType = React.Dispatch<React.SetStateAction<boolean>>;
export type authDataType = {
  email: string;
  password: string;
  confirmPW?: string;
};

export type userType = {
  id: string;
  username: string;
  email: string;
  bio?: string;
  isOnline: boolean;
  img: string;
  creationTime?: string;
  lastSeen?: string;
};
