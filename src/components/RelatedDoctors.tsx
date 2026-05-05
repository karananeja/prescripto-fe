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
    <div className='flex flex-col items-center gap-4 md:mx-10 my-16 text-gray-900'>
      <h1 className='font-medium text-3xl'>Related Doctors</h1>

      <p className='sm:w-1/3 text-sm text-center'>
        Simply browse through our extensive list of trusted doctors.
      </p>

      <div className='gap-4 gap-y-6 grid grid-cols-auto px-3 sm:px-0 pt-5 w-full'>
        {relatedDocs.slice(0, 5).map((doctor) => (
          <div
            onClick={() => {
              navigate(`/appointment/${doctor._id}`);
              scrollTo(0, 0);
            }}
            className='border border-blue-200 rounded-xl overflow-hidden transition-all hover:translate-y-[-10px] duration-500 cursor-pointer'
            key={doctor._id}
          >
            <img className='bg-blue-50' src={doctor.image} alt='doctor-image' />
            <div className='p-4'>
              <div className='flex items-center gap-2 text-green-500 text-sm text-center'>
                <span className='bg-green-500 rounded-full size-2' />
                <p className=''>Available</p>
              </div>
              <p className='font-medium text-gray-900 text-lg'>{doctor.name}</p>
              <p className='text-gray-600 text-sm'>{doctor.specialty}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
