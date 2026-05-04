import { useEffect, useReducer } from 'react';
import { toast } from 'react-toastify';

import { assets } from '../assets/assets';
import { useAppContext } from '../context/AppContext';
import { api } from '../lib/api-client';

interface UserData {
  name: string;
  email: string;
  image: string;
  address: { line1: string; line2: string };
  gender: string;
  dob: string;
  phone: string;
}

const GENDER_OPTIONS = ['Male', 'Female'];

type State = {
  userData: UserData;
  isEdit: boolean;
  imageFile: File | null;
  preview: string | null;
};

type Action =
  | { type: 'SET_USER'; payload: UserData }
  | { type: 'SET_FIELD'; field: keyof UserData; value: string }
  | { type: 'SET_ADDRESS'; field: 'line1' | 'line2'; value: string }
  | { type: 'SET_IMAGE'; file: File | null }
  | { type: 'SET_PREVIEW'; url: string | null }
  | { type: 'TOGGLE_EDIT' };

const initialState: State = {
  userData: {
    name: '',
    email: '',
    image: '',
    address: { line1: '', line2: '' },
    gender: '',
    dob: '',
    phone: '',
  },
  isEdit: false,
  imageFile: null,
  preview: null,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, userData: action.payload };

    case 'SET_FIELD':
      return {
        ...state,
        userData: { ...state.userData, [action.field]: action.value },
      };

    case 'SET_ADDRESS':
      return {
        ...state,
        userData: {
          ...state.userData,
          address: { ...state.userData.address, [action.field]: action.value },
        },
      };

    case 'SET_IMAGE':
      return { ...state, imageFile: action.file };

    case 'SET_PREVIEW':
      return { ...state, preview: action.url };

    case 'TOGGLE_EDIT':
      return { ...state, isEdit: !state.isEdit };

    default:
      return state;
  }
}

export const MyProfile = () => {
  const { userDetails } = useAppContext();

  const [state, dispatch] = useReducer(reducer, initialState);

  const { userData, isEdit, preview, imageFile } = state;

  useEffect(() => {
    dispatch({ type: 'SET_USER', payload: userDetails });
  }, [userDetails]);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleChange =
    (field: keyof UserData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      dispatch({ type: 'SET_FIELD', field, value: e.target.value });
    };

  const handleAddressChange =
    (field: 'line1' | 'line2') => (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({ type: 'SET_ADDRESS', field, value: e.target.value });
    };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    dispatch({ type: 'SET_IMAGE', file });

    if (file) {
      const url = URL.createObjectURL(file);
      dispatch({ type: 'SET_PREVIEW', url });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append('name', userData.name);
      formData.append('phone', userData.phone);
      formData.append('gender', userData.gender);
      formData.append('dob', userData.dob);
      formData.append('address', JSON.stringify(userData.address));

      if (imageFile) formData.append('image', imageFile);

      const res = await api.put('/user/update-user-info', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.success(res.data.message);
      dispatch({ type: 'SET_USER', payload: res.data.user });
      dispatch({ type: 'TOGGLE_EDIT' });
    } catch (error) {
      toast.error((error as Error).message);
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col gap-2 max-w-lg text-sm'
    >
      {isEdit ? (
        <>
          <label htmlFor='image-upload ' className='h-36'>
            <div className='inline-block relative cursor-pointer'>
              <img
                className='opacity-75 rounded w-36'
                src={preview || userData.image}
                alt='profile'
              />
              <img
                className='right-12 bottom-12 absolute w-10'
                src={assets.upload_icon}
                alt=''
              />
            </div>
          </label>
          <input
            type='file'
            id='image-upload'
            hidden
            onChange={handleImageChange}
            required={!userData.image}
          />
        </>
      ) : (
        <img className='rounded w-36' src={userData.image} alt='profile' />
      )}

      {isEdit ? (
        <input
          required
          className='bg-gray-100 mt-4 max-w-60 font-medium text-3xl'
          value={userData.name}
          onChange={handleChange('name')}
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
        <p className='h-5 text-blue-500'>{userData.email}</p>

        <p className='font-medium'>Phone:</p>
        {isEdit ? (
          <input
            className='bg-gray-100 max-w-52'
            required
            value={userData.phone}
            onChange={handleChange('phone')}
          />
        ) : (
          <p className='h-5 text-blue-500'>{userData.phone}</p>
        )}

        <p className='font-medium'>Address:</p>
        {isEdit ? (
          <div className='flex flex-col gap-2'>
            <input
              className='bg-gray-100'
              required
              value={userData.address.line1}
              onChange={handleAddressChange('line1')}
            />
            <input
              className='bg-gray-100'
              required
              value={userData.address.line2}
              onChange={handleAddressChange('line2')}
            />
          </div>
        ) : (
          <p className='flex flex-col gap-2 text-gray-500'>
            <span className='h-5'>{userData.address.line1}</span>
            <span className='h-5'>{userData.address.line2}</span>
          </p>
        )}
      </div>

      <p className='mt-3 text-neutral-500 underline'>BASIC INFORMATION</p>

      <div className='gap-y-2.5 grid grid-cols-[1fr_3fr] mt-3 text-neutral-700'>
        <p className='font-medium'>Gender:</p>
        {isEdit ? (
          <select
            className='bg-gray-100 max-w-28'
            required
            value={userData.gender}
            onChange={handleChange('gender')}
          >
            {GENDER_OPTIONS.map((gender) => (
              <option key={gender} value={gender}>
                {gender}
              </option>
            ))}
          </select>
        ) : (
          <p className='h-5 text-gray-500'>{userData.gender}</p>
        )}

        <p className='font-medium'>Birthday:</p>
        {isEdit ? (
          <input
            className='bg-gray-100 max-w-28'
            required
            type='date'
            value={userData.dob}
            onChange={handleChange('dob')}
          />
        ) : (
          <p className='h-[22px] text-gray-500'>{userData.dob}</p>
        )}
      </div>

      <div className='mt-10'>
        {isEdit ? (
          <div className='flex gap-2'>
            <button
              type='button'
              onClick={() => dispatch({ type: 'TOGGLE_EDIT' })}
              className='hover:bg-red-600 px-8 py-2 border rounded-full hover:text-white transition-all duration-300'
            >
              Cancel
            </button>
            <button
              type='submit'
              className='hover:bg-primary px-8 py-2 border border-primary rounded-full hover:text-white transition-all duration-300'
            >
              Save Information
            </button>
          </div>
        ) : (
          <button
            type='button'
            onClick={() => dispatch({ type: 'TOGGLE_EDIT' })}
            className='hover:bg-primary px-8 py-2 border border-primary rounded-full hover:text-white transition-all duration-300'
          >
            Edit
          </button>
        )}
      </div>
    </form>
  );
};
