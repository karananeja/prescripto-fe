import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useAppContext } from '../context/AppContext';
import { cn } from '../utils';

const SPECIALTIES = [
  'General physician',
  'Gynecologist',
  'Dermatologist',
  'Pediatricians',
  'Neurologist',
  'Gastroenterologist',
];

export const Doctors = () => {
  const [filterDocs, setFilterDocs] = useState<typeof doctors>([]);
  const [showFilter, setShowFilter] = useState(false);

  const { specialty } = useParams();
  const navigate = useNavigate();

  const { doctors } = useAppContext();

  useEffect(() => {
    if (!specialty) setFilterDocs(doctors);
    else
      setFilterDocs(doctors.filter((doctor) => doctor.specialty === specialty));
  }, [doctors, specialty]);

  const filterDoctors = (filter: string) => {
    if (specialty === filter) navigate('/doctors');
    else navigate(`/doctors/${filter}`);
  };

  return (
    <>
      <p className='text-gray-600'>Browse through the doctors specialist.</p>

      <div className='flex sm:flex-row flex-col items-start gap-5 mt-5'>
        <button
          className={cn(
            'sm:hidden px-3 py-1 border rounded text-sm transition-all',
            showFilter && 'bg-primary text-white'
          )}
          onClick={() => setShowFilter(!showFilter)}
        >
          Filters
        </button>

        <div
          className={cn(
            'flex-col gap-4 text-gray-600 text-sm',
            showFilter ? 'flex' : 'hidden sm:flex'
          )}
        >
          {SPECIALTIES.map((item) => (
            <p
              key={item}
              className={cn(
                'py-1.5 pr-16 pl-3 border border-gray-300 rounded w-[94vw] sm:w-auto transition-all cursor-pointer',
                { 'bg-indigo-100 text-black': specialty === item }
              )}
              onClick={() => filterDoctors(item)}
            >
              {item}
            </p>
          ))}
        </div>

        <div className='gap-4 gap-y-6 grid grid-cols-auto w-full'>
          {filterDocs.map((doctor) => (
            <div
              onClick={() => {
                navigate(`/appointment/${doctor._id}`);
                scrollTo(0, 0);
              }}
              className='border border-blue-200 rounded-xl overflow-hidden transition-all hover:translate-y-[-10px] duration-500 cursor-pointer'
              key={doctor._id}
            >
              <img
                className='bg-blue-50'
                src={doctor.image}
                alt='doctor-image'
              />
              <div className='p-4'>
                <div className='flex items-center gap-2 text-green-500 text-sm text-center'>
                  <span className='bg-green-500 rounded-full size-2' />
                  <p className=''>Available</p>
                </div>
                <p className='font-medium text-gray-900 text-lg'>
                  {doctor.name}
                </p>
                <p className='text-gray-600 text-sm'>{doctor.specialty}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
