import { Outlet, useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { UserContext } from '../Contexts/UserContext';

export const ProtectRoute = () => {
  const navegate = useNavigate();
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!user) {
      navegate('/');
    }
  }, []);

  return user ? <Outlet /> : null;
};
