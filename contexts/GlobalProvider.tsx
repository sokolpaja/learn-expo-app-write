import { getCurrentUser } from '@/lib/appwrite';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface GlobalContextProps {
  isLoading: boolean;
  isLogged: boolean;
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
}

const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }
  return context;
};

const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getCurrentUser()
      .then((res: any) => {
        console.log('🚀 ~ .then ~ res:', res);
        if (res) {
          setIsLogged(true);
          setUser(res);
        } else {
          setIsLogged(false);
          setUser(null);
        }
      })
      .catch((err) => console.log('GlobalProvider err', err))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isLoading,
        isLogged,
        user,
        setUser,
        setIsLogged,
      }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
