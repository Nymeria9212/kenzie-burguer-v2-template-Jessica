/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
import { createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import {
  iContextProps,
  iContextUser,
  iLogin,
  iUserCreate,
} from '../Interfaces/userInterface';
import { apiBurguer } from '../Services';

export const UserContext = createContext({} as iContextUser);

export const UserProvider = ({ children }: iContextProps) => {
  const [user, setUser] = useState('');
  const navegate = useNavigate();
  const id = localStorage.getItem('@idUser');

  const createUser = async (dataUser: iUserCreate) => {
    try {
      const response = await apiBurguer.post('/users', dataUser);
      toast.success('Usuário cadastrado com sucesso');
      navegate('/');
    } catch (error) {
      toast.error(`${error}`);
    }
  };
  const login = async (dataForm: iLogin) => {
    try {
      const response = await apiBurguer.post('/login ', dataForm);
      localStorage.setItem('@tokenUser', response.data.accessToken);
      localStorage.setItem('@idUser', response.data.user.id);
      setUser(response.data.accessToken);
      navegate('/shop');
    } catch (error) {
      toast.error(`${error}`);
    }
  };

  const autoLogin = async (id: string | null) => {
    const token = localStorage.getItem('@tokenUser');
    if (token) {
      try {
        const response = await apiBurguer.get(`/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        navegate('/shop');
        setUser(response.data);
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    autoLogin(id);
  }, []);

  const logout = () => {
    localStorage.removeItem('@tokenUser');
    localStorage.removeItem('@idUser');
    navegate('/');
  };

  return (
    <UserContext.Provider value={{ user, logout, login, createUser }}>
      {children}
    </UserContext.Provider>
  );
};
