import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { toast } from 'react-toastify';

import { api } from '../lib/api-client';

type PropsType = { children: ReactNode };

type AppContextType = {
  currencySymbol: string;
  doctors: Doctor[];
  fetchDoctors: () => void;
  isDoctorsLoading: boolean;
  isUserLoading: boolean;
  setUserToken: (token: string) => void;
  token: string;
  userDetails: UserData;
};

const AppContext = createContext<AppContextType | null>(null);

export const AppContextProvider = ({ children }: PropsType) => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [token, setToken] = useState(localStorage.getItem('userToken') || '');
  const [userDetails, setUserDetails] = useState<UserData>({
    name: '',
    email: '',
    image: '',
    address: { line1: '', line2: '' },
    gender: '',
    dob: '',
    phone: '',
  });
  const [isDoctorsLoading, setIsDoctorsLoading] = useState(false);
  const [isUserLoading, setIsUserLoading] = useState(false);

  const fetchDoctors = async () => {
    try {
      setIsDoctorsLoading(true);
      const res = await api.get('/doctor/get-all-doctors');
      setDoctors(res.data.doctors);
    } catch (error) {
      toast.error((error as Error).message);
      console.error(error);
    } finally {
      setIsDoctorsLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  useEffect(() => {
    if (!token) return;

    const fetchUserDetails = async () => {
      try {
        setIsUserLoading(true);
        const res = await api.get('/user/get-user-info');
        setUserDetails(res.data.user);
      } catch (error) {
        toast.error((error as Error).message);
        console.error(error);
      } finally {
        setIsUserLoading(false);
      }
    };

    fetchUserDetails();
  }, [token]);

  const setUserToken = (token: string) => {
    localStorage.setItem('userToken', token);
    setToken(token);
    if (!token) localStorage.removeItem('userToken');
  };

  const currencySymbol = '₹';
  const value: AppContextType = {
    currencySymbol,
    doctors,
    fetchDoctors,
    isDoctorsLoading,
    isUserLoading,
    setUserToken,
    token,
    userDetails,
  };
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
