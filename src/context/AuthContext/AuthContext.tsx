'use client';

import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';
import isTokenExp from '../../utils/isTokenExp';
import { logout } from '../../auth/firebase';

interface AuthContextProps {
  isAuth: boolean;
  isExp: Date | null | boolean;
  isLoading: boolean;
  updateAuthStatus: (token: string | null) => void;
}

const AuthContext = createContext<AuthContextProps>({
  isAuth: false,
  isExp: null,
  isLoading: true,
  updateAuthStatus: () => {},
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuth, setIsAuth] = useState(false);
  const [isExp, setIsExp] = useState<Date | null | boolean>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pageLoaded, setPageLoaded] = useState(false);

  const updateAuthStatus = async (token: string | null) => {
    if (token) {
      const isTokenExpired = isTokenExp(token);
      setIsExp(isTokenExpired);
      setIsAuth(true);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    updateAuthStatus(token).then(() => {
      setPageLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (isExp) {
      logout();
      localStorage.removeItem('accessToken');
      setIsAuth(false);
    }
  }, [isExp]);

  const values: AuthContextProps = {
    isAuth,
    isExp,
    isLoading: isLoading || !pageLoaded,
    updateAuthStatus,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
