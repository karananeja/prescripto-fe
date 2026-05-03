import { FormEvent, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useAppContext } from '../context/AppContext';
import { api } from '../lib/api-client';

export const Login = () => {
  const { setUserToken, token } = useAppContext();

  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (!isLogin) {
        const res = await api.post('/user/register', { name, email, password });
        setUserToken(res.data.token);
        toast.success(res.data.message);
      } else {
        const res = await api.post('/user/login', { email, password });
        setUserToken(res.data.token);
        toast.success(res.data.message);
      }

      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  if (token) return <Navigate to='/' />;

  return (
    <form className='flex items-center min-h-[80vh]' onSubmit={handleSubmit}>
      <div className='flex flex-col items-start gap-3 shadow-lg m-auto p-8 border rounded-xl min-w-80 sm:min-w-96 text-zinc-600 text-sm'>
        <p className='font-semibold text-2xl'>
          {isLogin ? 'Login' : 'Create Account'}
        </p>
        <p>Please {isLogin ? 'log in' : 'sign up'} to book appointment</p>

        {!isLogin ? (
          <div className='w-full'>
            <p>Full Name</p>
            <input
              className='mt-1 p-2 border border-zinc-300 rounded w-full'
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        ) : null}

        <div className='w-full'>
          <p>Email</p>
          <input
            className='mt-1 p-2 border border-zinc-300 rounded w-full'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className='w-full'>
          <p>Password</p>
          <input
            className='mt-1 p-2 border border-zinc-300 rounded w-full'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button className='bg-primary my-2 py-2 rounded-md w-full text-white text-base'>
          {isLogin ? 'Login' : 'Create Account'}
        </button>

        {isLogin ? (
          <p>
            Create a new account?{' '}
            <span
              className='text-primary underline cursor-pointer'
              onClick={() => setIsLogin(!isLogin)}
            >
              Click here
            </span>
          </p>
        ) : (
          <p>
            Already have an account?{' '}
            <span
              className='text-primary underline cursor-pointer'
              onClick={() => setIsLogin(!isLogin)}
            >
              Login here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};
