import { Link } from 'react-router-dom';

import { specialtyData } from '../assets/assets';

export const SpecialtyMenu = () => {
  return (
    <div
      id='specialty'
      className='flex flex-col items-center gap-4 py-16 text-gray-900'
    >
      <h1 className='font-medium text-3xl'>Find by Specialty</h1>

      <p className='sm:w-1/3 text-sm text-center'>
        Simply browse through our extensive list of trusted doctors, schedule
        your appointment hassle-free.
      </p>

      <div className='flex sm:justify-center gap-4 pt-5 w-full overflow-scroll'>
        {specialtyData.map((data) => (
          <Link
            className='flex flex-col flex-shrink-0 items-center text-xs transition-all hover:translate-y-[-10px] duration-500 cursor-pointer'
            to={`/doctors/${data.specialty}`}
            key={data.specialty}
            onClick={() => scrollTo(0, 0)}
          >
            <img
              className='mb-2 w-16 sm:w-24'
              src={data.image}
              alt={data.specialty}
            />
            <p>{data.specialty}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};
