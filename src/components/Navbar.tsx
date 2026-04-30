import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { assets } from '../assets/assets';
import { cn } from '../utils';

const PATH_OPTIONS = [
  { path: '/', label: 'HOME' },
  { path: '/doctors', label: 'ALL DOCTORS' },
  { path: '/about', label: 'ABOUT' },
  { path: '/contact', label: 'CONTACT' },
];

export const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [token, setToken] = useState(false);

  const navigate = useNavigate();

  return (
    <div className='flex justify-between items-center mb-5 py-4 border-b border-b-gray-400 text-sm'>
      <img
        className='w-44 cursor-pointer'
        src={assets.logo}
        alt='app-logo'
        onClick={() => navigate('/')}
      />

      <ul className='hidden md:flex items-start gap-5 font-medium'>
        {PATH_OPTIONS.map((option) => (
          <NavLink key={option.path} to={option.path}>
            {({ isActive }) => (
              <>
                <li className='py-1'>{option.label}</li>
                <hr
                  className={cn(
                    'invisible bg-primary m-auto border-none outline-none w-3/5 h-0.5',
                    isActive && 'visible'
                  )}
                />
              </>
            )}
          </NavLink>
        ))}
      </ul>

      <div className='flex items-center gap-4'>
        {token ? (
          <div className='group relative flex items-center gap-2 cursor-pointer'>
            <img
              className='rounded-full w-8'
              src={assets.profile_pic}
              alt='user-picture'
            />

            <img
              className='w-2.5'
              src={assets.dropdown_icon}
              alt='more-options'
            />

            <div className='hidden group-hover:block top-0 right-0 z-20 absolute pt-14 font-medium text-gray-600 text-base'>
              <div className='flex flex-col gap-4 bg-stone-100 p-4 rounded min-w-48'>
                <p
                  className='hover:text-black cursor-pointer'
                  onClick={() => navigate('/my-profile')}
                >
                  My Profile
                </p>
                <p
                  className='hover:text-black cursor-pointer'
                  onClick={() => navigate('/my-appointments')}
                >
                  My Appointments
                </p>
                <p
                  className='hover:text-black cursor-pointer'
                  onClick={() => setToken(false)}
                >
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            className='hidden md:block bg-primary px-8 py-3 rounded-full font-light text-white'
            onClick={() => navigate('/login')}
          >
            Create Account
          </button>
        )}

        <img
          className='md:hidden w-6 cursor-pointer'
          src={assets.menu_icon}
          alt='menu-icon'
          onClick={() => setShowMenu(true)}
        />

        <div
          className={cn(
            'md:hidden top-0 right-0 bottom-0 z-20 bg-white overflow-hidden transition-all',
            showMenu ? 'fixed w-full' : 'size-0'
          )}
        >
          <div className='flex justify-between items-center px-5 py-6'>
            <img
              className='w-36 cursor-pointer'
              src={assets.logo}
              alt='app-logo'
              onClick={() => navigate('/')}
            />
            <img
              className='size-7 cursor-pointer'
              src={assets.cross_icon}
              alt='cross-icon'
              onClick={() => setShowMenu(false)}
            />
          </div>

          <ul className='flex flex-col items-center gap-2 mt-5 px-5 font-medium text-lg'>
            {PATH_OPTIONS.map((option) => (
              <NavLink
                key={option.path}
                className={({ isActive }) =>
                  cn(
                    'inline-block px-4 py-2 rounded',
                    isActive && 'text-white bg-primary'
                  )
                }
                to={option.path}
                onClick={() => setShowMenu(false)}
              >
                {option.label}
              </NavLink>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
