import { createContext, ReactNode, useContext } from 'react';

import { doctors } from '../assets/assets';

type PropsType = { children: ReactNode };

type AppContextType = { doctors: typeof doctors };

const AppContext = createContext<AppContextType | null>(null);

export const AppContextProvider = ({ children }: PropsType) => {
  const value = { doctors };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error(
      'useAppContext must be used within an <AppContextProvider />'
    );
  }
  return context;
};
