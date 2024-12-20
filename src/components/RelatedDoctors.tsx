import { useNavigate } from 'react-router-dom';

import { useAppContext } from '../context/AppContext';

type PropsType = { docId: string; specialty: string };

export const RelatedDoctors = (props: PropsType) => {
  const { docId, specialty } = props;

  const navigate = useNavigate();

  const { doctors } = useAppContext();

  const relatedDocs = doctors.filter(
    (doctor) => doctor.specialty === specialty && doctor._id !== docId
  );

  return (
    <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
      <h1 className='text-3xl font-medium'>RelatedDoctors</h1>

      <p className='sm:w-1/3 text-center text-sm'>
        Simply browse through our extensive list of trusted doctors.
      </p>

      <div className='w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
        {relatedDocs.slice(0, 5).map((doctor) => (
          <div
            onClick={() => {
              navigate(`/appointment/${doctor._id}`);
              scrollTo(0, 0);
            }}
            className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'
            key={doctor._id}
          >
            <img className='bg-blue-50' src={doctor.image} alt='doctor-image' />
            <div className='p-4'>
              <div className='flex items-center gap-2 text-sm text-center text-green-500'>
                <span className='size-2 bg-green-500 rounded-full' />
                <p className=''>Available</p>
              </div>
              <p className='text-gray-900 text-lg font-medium'>{doctor.name}</p>
              <p className='text-gray-600 text-sm'>{doctor.specialty}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
