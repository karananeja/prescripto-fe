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

      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        <div className='flex flex-col gap-4 text-sm text-gray-600'>
          {SPECIALTIES.map((item) => (
            <p
              key={item}
              className={cn(
                'w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer',
                { 'bg-indigo-100 text-black': specialty === item }
              )}
              onClick={() => filterDoctors(item)}
            >
              {item}
            </p>
          ))}
        </div>

        <div className='w-full grid grid-cols-auto gap-4 gap-y-6'>
          {filterDocs.map((doctor) => (
            <div
              onClick={() => navigate(`/appointment/${doctor._id}`)}
              className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'
              key={doctor._id}
            >
              <img
                className='bg-blue-50'
                src={doctor.image}
                alt='doctor-image'
              />
              <div className='p-4'>
                <div className='flex items-center gap-2 text-sm text-center text-green-500'>
                  <span className='size-2 bg-green-500 rounded-full' />
                  <p className=''>Available</p>
                </div>
                <p className='text-gray-900 text-lg font-medium'>
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
