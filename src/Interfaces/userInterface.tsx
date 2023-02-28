export interface iContextProps {
  children: React.ReactNode;
}

export interface iUserCreate {
  email: string;
  password: string;
  name: string;
  checkpassword?: string;
}

export interface iLogin {
  email: string;
  password: string;
}
export interface iContextUser {
  user: string;
  logout: () => void;
  login: (dataForm: iLogin) => Promise<void>;
  createUser: (dataUser: iUserCreate) => Promise<void>;
}
