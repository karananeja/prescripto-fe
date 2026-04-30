import { useState } from 'react';

import { assets } from '../assets/assets';

const GENDER_OPTIONS = ['Male', 'Female'];

export const MyProfile = () => {
  const [userData, setUserData] = useState({
    name: 'Michael Williams',
    image: assets.profile_pic,
    phone: '+81 965-431-3024',
    email: 'michael.williams@x.dummyjson.com',
    address: { line1: '626 Main Street', line2: 'Phoenix Mississippi' },
    gender: 'Male',
    dob: '1989-8-10',
  });
  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className='flex flex-col gap-2 max-w-lg text-sm'>
      <img className='rounded w-36' src={userData.image} alt='profile-pic' />

      {isEdit ? (
        <input
          className='bg-gray-100 mt-4 max-w-60 font-medium text-3xl'
          type='text'
          value={userData.name}
          onChange={(e) =>
            setUserData((prev) => ({ ...prev, name: e.target.value }))
          }
        />
      ) : (
        <p className='mt-4 font-medium text-neutral-800 text-3xl'>
          {userData.name}
        </p>
      )}

      <hr className='bg-zinc-400 border-none h-[1px]' />

      <p className='mt-3 text-neutral-500 underline'>CONTACT INFORMATION</p>

      <div className='gap-y-2.5 grid grid-cols-[1fr_3fr] mt-3 text-neutral-700'>
        <p className='font-medium'>Email ID:</p>
        <p className='text-blue-500'>{userData.email}</p>

        <p className='font-medium'>Phone:</p>
        {isEdit ? (
          <input
            className='bg-gray-100 max-w-52'
            type='text'
            value={userData.phone}
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, phone: e.target.value }))
            }
          />
        ) : (
          <p className='text-blue-500'>{userData.phone}</p>
        )}

        <p className='font-medium'>Address:</p>
        {isEdit ? (
          <p className='flex flex-col gap-2'>
            <input
              className='bg-gray-100'
              type='text'
              value={userData.address.line1}
              onChange={(e) =>
                setUserData((prev) => ({
                  ...prev,
                  address: { ...prev.address, line1: e.target.value },
                }))
              }
            />
            <input
              className='bg-gray-100'
              type='text'
              value={userData.address.line2}
              onChange={(e) =>
                setUserData((prev) => ({
                  ...prev,
                  address: { ...prev.address, line2: e.target.value },
                }))
              }
            />
          </p>
        ) : (
          <p className='flex flex-col gap-2 text-gray-500'>
            <span>{userData.address.line1}</span>
            <span>{userData.address.line2}</span>
          </p>
        )}
      </div>

      <p className='mt-3 text-neutral-500 underline'>BASIC INFORMATION</p>

      <div className='gap-y-2.5 grid grid-cols-[1fr_3fr] mt-3 text-neutral-700'>
        <p className='font-medium'>Gender:</p>
        {isEdit ? (
          <select
            className='bg-gray-100 max-w-28'
            value={userData.gender}
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, gender: e.target.value }))
            }
          >
            {GENDER_OPTIONS.map((gender) => (
              <option key={gender} value={gender}>
                {gender}
              </option>
            ))}
          </select>
        ) : (
          <p className='text-gray-500'>{userData.gender}</p>
        )}

        <p className='font-medium'>Birthday:</p>
        {isEdit ? (
          <input
            className='bg-gray-100 max-w-28'
            type='date'
            value={userData.dob}
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, dob: e.target.value }))
            }
          />
        ) : (
          <p className='text-gray-500'>{userData.dob}</p>
        )}
      </div>

      <div className='mt-10'>
        {isEdit ? (
          <button
            className='hover:bg-primary px-8 py-2 border border-primary rounded-full hover:text-white transition-all duration-300'
            onClick={() => setIsEdit(!isEdit)}
          >
            Save Information
          </button>
        ) : (
          <button
            className='hover:bg-primary px-8 py-2 border border-primary rounded-full hover:text-white transition-all duration-300'
            onClick={() => setIsEdit(!isEdit)}
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};
