import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';
import { TUser } from '@/utilities/types';

type UserContextType = {
  users: TUser[];
  setUsers: Dispatch<SetStateAction<TUser[]>>; // Specify the correct type here
};

const UserContext = createContext<UserContextType | undefined>(undefined);
/* eslint-disable */
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};

type UserProviderProps = {
  children: ReactNode;
};

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [users, setUsers] = useState<TUser[]>([]);

  return (
    <UserContext.Provider value={{ users, setUsers }}>
      {children}
    </UserContext.Provider>
  );
};
