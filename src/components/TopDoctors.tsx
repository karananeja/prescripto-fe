import { useNavigate } from 'react-router-dom';

import { useAppContext } from '../context/AppContext';

const TopDoctorsSkeleton = () => {
  return (
    <div className='flex flex-col items-center gap-4 md:mx-10 my-16 animate-pulse'>
      {/* Heading */}
      <div className='bg-gray-200 rounded w-72 h-8' />

      {/* Subheading */}
      <div className='bg-gray-200 rounded w-2/3 sm:w-1/3 h-4' />

      {/* Doctors Grid */}
      <div className='gap-4 gap-y-6 grid grid-cols-auto px-3 sm:px-0 pt-5 w-full'>
        {Array.from({ length: 10 }).map((_, idx) => (
          <div
            key={idx}
            className='border border-gray-200 rounded-xl overflow-hidden'
          >
            {/* Doctor Image */}
            <div className='bg-gray-200 w-full h-52' />

            {/* Card Content */}
            <div className='p-4'>
              {/* Availability */}
              <div className='flex items-center gap-2 mb-3'>
                <div className='bg-gray-200 rounded-full size-2' />
                <div className='bg-gray-200 rounded w-20 h-3' />
              </div>

              {/* Doctor Name */}
              <div className='bg-gray-200 mb-2 rounded w-40 h-5' />

              {/* Specialty */}
              <div className='bg-gray-200 rounded w-28 h-4' />
            </div>
          </div>
        ))}
      </div>

      {/* Button */}
      <div className='bg-gray-200 mt-10 rounded-full w-36 h-12' />
    </div>
  );
};

export const TopDoctors = () => {
  const { doctors, isDoctorsLoading } = useAppContext();

  const navigate = useNavigate();

  return isDoctorsLoading ? (
    <TopDoctorsSkeleton />
  ) : (
    <div className='flex flex-col items-center gap-4 md:mx-10 my-16 text-gray-900'>
      <h1 className='font-medium text-3xl'>Top Doctors to Book</h1>
      {doctors.length > 0 ? (
        <>
          <p className='sm:w-1/3 text-sm text-center'>
            Simply browse through our extensive list of trusted doctors.
          </p>
          <div className='gap-4 gap-y-6 grid grid-cols-auto px-3 sm:px-0 pt-5 w-full'>
            {doctors.slice(0, 10).map((doctor) => (
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
                    <span
                      className={`${
                        doctor.available ? 'bg-green-500' : 'bg-gray-500'
                      } rounded-full size-2`}
                    />
                    <p
                      className={`${
                        doctor.available ? 'text-green-500' : 'text-gray-500'
                      }`}
                    >
                      {doctor.available ? 'Available' : 'Not Available'}
                    </p>
                  </div>
                  <p className='font-medium text-gray-900 text-lg'>
                    {doctor.name}
                  </p>
                  <p className='text-gray-600 text-sm'>{doctor.specialty}</p>
                </div>
              </div>
            ))}
          </div>

          <button
            className='bg-blue-50 mt-10 px-12 py-3 rounded-full text-gray-600'
            onClick={() => {
              navigate('/doctors');
              scrollTo(0, 0);
            }}
          >
            More
          </button>
        </>
      ) : (
        <p className='flex justify-center items-center h-40 text-zinc-400 text-sm text-center'>
          No top doctors found
        </p>
      )}
    </div>
  );
};
