import { useAppContext } from '../context/AppContext';

export const MyAppointments = () => {
  const { doctors } = useAppContext();

  return (
    <>
      <p className='mt-12 pb-3 border-b font-medium text-zinc-700'>
        My Appointments
      </p>

      {doctors.slice(0, 3).map((doctor) => (
        <div
          className='sm:flex gap-4 sm:gap-6 grid grid-cols-[1fr_2fr] py-2 border-b'
          key={doctor._id}
        >
          <img
            className='bg-indigo-50 size-32'
            src={doctor.image}
            alt='doctor-image'
          />

          <div className='flex-1 text-zinc-600 text-sm'>
            <p className='font-semibold text-neutral-800'>{doctor.name}</p>
            <p>{doctor.specialty}</p>
            <p className='mt-1 font-medium text-zinc-700'>Address:</p>
            <p className='text-xs'>{doctor.address.line1}</p>
            <p className='text-xs'>{doctor.address.line2}</p>
            <p className='mt-1 text-xs'>
              <span className='font-medium text-neutral-700 text-sm'>
                Date & Time:
              </span>{' '}
              23, Dec, 2024 | 8:30 PM
            </p>
          </div>

          <div />

          <div className='flex flex-col justify-end gap-2'>
            <button className='hover:bg-primary py-2 border rounded sm:min-w-48 text-stone-500 hover:text-white text-sm text-center transition-all duration-300'>
              Pay Online
            </button>
            <button className='hover:bg-red-600 py-2 border rounded sm:min-w-48 text-stone-500 hover:text-white text-sm text-center transition-all duration-300'>
              Cancel Appointment
            </button>
          </div>
        </div>
      ))}
    </>
  );
};
