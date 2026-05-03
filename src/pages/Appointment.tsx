import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { assets } from '../assets/assets';
import { RelatedDoctors } from '../components/RelatedDoctors';
import { useAppContext } from '../context/AppContext';
import { cn } from '../utils';

const DAYS_OF_WEEK = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

const getSlots = () => {
  const today = new Date();
  const timeSlots: { datetime: Date; time: string }[][] = [];
  const isLateEvening = today.getHours() >= 21;
  const startIdx = isLateEvening ? 1 : 0;
  const endIdx = startIdx + 7;

  for (let idx = startIdx; idx < endIdx; idx++) {
    const currentDate = new Date(today);
    currentDate.setDate(today.getDate() + idx);

    const endTime = new Date();
    endTime.setDate(today.getDate() + idx);
    endTime.setHours(21, 0, 0, 0);

    if (today.getDate() === currentDate.getDate()) {
      currentDate.setHours(
        currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
      );
      currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
    } else {
      currentDate.setHours(10);
      currentDate.setMinutes(0);
    }

    const dayTimeSlots: { datetime: Date; time: string }[] = [];

    while (currentDate < endTime) {
      const formattedTime = currentDate.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });

      dayTimeSlots.push({
        datetime: new Date(currentDate),
        time: formattedTime,
      });

      currentDate.setMinutes(currentDate.getMinutes() + 30);
    }

    timeSlots.push(dayTimeSlots);
  }

  return timeSlots;
};

export const Appointment = () => {
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');

  const { docId } = useParams();

  const { currencySymbol, doctors } = useAppContext();

  const doctorSlots = getSlots();

  const doctorInfo = doctors.find((doctor) => doctor._id === docId);

  return (
    doctorInfo && (
      <>
        <div className='flex sm:flex-row flex-col gap-4'>
          <img
            className='bg-primary rounded-lg w-full sm:max-w-72'
            src={doctorInfo.image}
            alt='doctor-image'
          />

          <div className='flex-1 bg-white mx-2 sm:mx-0 -mt-20 sm:mt-0 px-8 py-7 border border-gray-400 rounded-lg'>
            <p className='flex items-center gap-2 font-medium text-gray-900 text-3xl'>
              {doctorInfo.name}
              <img
                className='w-5'
                src={assets.verified_icon}
                alt='verified-icon'
              />
            </p>

            <div className='flex items-center gap-2 mt-1 text-gray-600'>
              <p>
                {doctorInfo.degree} - {doctorInfo.specialty}
              </p>
              <button className='px-2 py-0.5 border rounded-full text-xs'>
                {doctorInfo.experience}
              </button>
            </div>

            <>
              <p className='flex items-center gap-1 mt-3 font-medium text-gray-900 text-sm'>
                About
                <img className='w-3' src={assets.info_icon} alt='info-icon' />
              </p>

              <p className='mt-1 max-w-[700px] text-gray-500 text-sm'>
                {doctorInfo.about}
              </p>
            </>

            <p className='mt-4 font-medium text-gray-600'>
              Appointment fee:{' '}
              <span className='text-gray-800'>
                {currencySymbol}
                {doctorInfo.fee}
              </span>
            </p>
          </div>
        </div>

        <div className='mt-8 sm:ml-72 sm:pl-4 font-medium text-gray-700'>
          <p>Booking slots</p>

          <div className='flex items-center gap-3 mt-4 w-full overflow-x-scroll'>
            {doctorSlots.map((daySlots, idx) => (
              <div
                className={cn(
                  'py-6 border border-gray-200 rounded-full min-w-16 text-center cursor-pointer',
                  { 'bg-primary text-white': idx === slotIndex }
                )}
                key={idx}
                onClick={() => setSlotIndex(idx)}
              >
                <p>
                  {daySlots[0] && DAYS_OF_WEEK[daySlots[0].datetime.getDay()]}
                </p>
                <p>{daySlots[0] && daySlots[0].datetime.getDate()}</p>
              </div>
            ))}
          </div>

          <div className='flex items-center gap-3 mt-4 w-full overflow-x-scroll'>
            {doctorSlots[slotIndex].map((slot) => (
              <p
                className={cn(
                  'flex-shrink-0 px-5 py-2 border border-gray-300 rounded-full font-light text-gray-400 text-sm cursor-pointer',
                  { 'bg-primary text-white': slot.time === slotTime }
                )}
                key={slot.time}
                onClick={() => setSlotTime(slot.time)}
              >
                {slot.time.toLowerCase()}
              </p>
            ))}
          </div>

          <button className='bg-primary my-6 px-20 py-3 rounded-full font-light text-white text-sm'>
            Book an appointment
          </button>
        </div>

        <RelatedDoctors docId={docId!} specialty={doctorInfo.specialty} />
      </>
    )
  );
};
