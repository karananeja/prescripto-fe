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
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400'>
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
                    'border-none outline-none h-0.5 bg-primary w-3/5 m-auto invisible',
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
          <div className='flex items-center gap-2 cursor-pointer group relative'>
            <img
              className='w-8 rounded-full'
              src={assets.profile_pic}
              alt='user-picture'
            />

            <img
              className='w-2.5'
              src={assets.dropdown_icon}
              alt='more-options'
            />

            <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
              <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
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
            className='bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block'
            onClick={() => navigate('/login')}
          >
            Create Account
          </button>
        )}

        <img
          className='w-6 md:hidden cursor-pointer'
          src={assets.menu_icon}
          alt='menu-icon'
          onClick={() => setShowMenu(true)}
        />

        <div
          className={cn(
            'md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all',
            showMenu ? 'fixed w-full' : 'size-0'
          )}
        >
          <div className='flex items-center justify-between px-5 py-6'>
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

          <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
            {PATH_OPTIONS.map((option) => (
              <NavLink
                key={option.path}
                className={({ isActive }) =>
                  cn(
                    'px-4 py-2 rounded inline-block',
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
