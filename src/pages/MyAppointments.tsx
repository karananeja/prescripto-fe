import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { api } from '../lib/api-client';

const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const MyAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await api.get('/user/get-my-appointments');
        setAppointments(res.data.appointments);
      } catch (error) {
        toast.error((error as Error).message);
        console.error(error);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <>
      <p className='mt-12 pb-3 border-b font-medium text-zinc-700'>
        My Appointments
      </p>

      {appointments.length > 0 ? (
        appointments.map((appointment) => {
          const [date, month, year] = appointment.slotDate.split('_');

          return (
            <div
              className='sm:flex gap-4 sm:gap-6 grid grid-cols-[1fr_2fr] py-2 border-b'
              key={appointment._id}
            >
              <img
                className='bg-indigo-50 size-32'
                src={appointment.docData.image}
                alt='doctor-image'
              />

              <div className='flex-1 text-zinc-600 text-sm'>
                <p className='font-semibold text-neutral-800'>
                  {appointment.docData.name}
                </p>
                <p>{appointment.docData.specialty}</p>
                <p className='mt-1 font-medium text-zinc-700'>Address:</p>
                <p className='text-xs'>{appointment.docData.address.line1}</p>
                <p className='text-xs'>{appointment.docData.address.line2}</p>
                <p className='mt-1 text-xs'>
                  <span className='font-medium text-neutral-700 text-sm'>
                    Date & Time:
                  </span>{' '}
                  {date}, {MONTHS[+month - 1]}, {year} | {appointment.slotTime}
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
          );
        })
      ) : (
        <p className='flex justify-center items-center h-[32vh] text-zinc-400 text-sm text-center'>
          No appointments found
        </p>
      )}
    </>
  );
};
