import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { assets } from '../assets/assets';
import { RelatedDoctors } from '../components/RelatedDoctors';
import { useAppContext } from '../context/AppContext';
import { api } from '../lib/api-client';
import { cn } from '../utils';

const DAYS_OF_WEEK = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

const DoctorProfileSkeleton = () => {
  return (
    <div className='animate-pulse'>
      {/* Top Section */}
      <div className='flex sm:flex-row flex-col gap-4'>
        {/* Image */}
        <div className='bg-gray-200 rounded-lg w-full sm:max-w-72 h-72' />

        {/* Info Card */}
        <div className='flex-1 bg-white mx-2 sm:mx-0 -mt-20 sm:mt-0 px-8 pt-7 border border-gray-200 rounded-lg'>
          {/* Name */}
          <div className='bg-gray-200 mb-4 rounded w-64 h-8' />

          {/* Degree + Specialty */}
          <div className='bg-gray-200 mb-4 rounded w-48 h-4' />

          {/* Experience */}
          <div className='bg-gray-200 mb-6 rounded-full w-24 h-6' />

          {/* About Title */}
          <div className='bg-gray-200 mb-3 rounded w-20 h-4' />

          {/* About Text */}
          <div className='space-y-2'>
            <div className='bg-gray-200 rounded w-full h-3' />
            <div className='bg-gray-200 rounded w-11/12 h-3' />
            <div className='bg-gray-200 rounded w-10/12 h-3' />
          </div>

          {/* Fee */}
          <div className='bg-gray-200 mt-6 rounded w-40 h-4' />
        </div>
      </div>

      {/* Slots Section */}
      <div className='mt-8 sm:ml-72 sm:pl-4'>
        {/* Title */}
        <div className='bg-gray-200 mb-4 rounded w-32 h-4' />

        {/* Days */}
        <div className='flex gap-3 overflow-x-scroll'>
          {Array.from({ length: 5 }).map((_, idx) => (
            <div key={idx} className='bg-gray-200 rounded-full min-w-16 h-24' />
          ))}
        </div>

        {/* Time Slots */}
        <div className='flex gap-3 mt-4 overflow-x-scroll'>
          {Array.from({ length: 6 }).map((_, idx) => (
            <div
              key={idx}
              className='flex-shrink-0 bg-gray-200 rounded-full w-24 h-9'
            />
          ))}
        </div>

        {/* Button */}
        <div className='bg-gray-200 my-6 rounded-full w-64 h-12' />
      </div>

      {/* Related Doctors */}
      <div className='space-y-3 mt-10'>
        <div className='flex flex-col justify-center items-center gap-8 w-full'>
          <div className='bg-gray-200 rounded w-40 h-5' />
          <div className='bg-gray-200 rounded w-80 h-5' />
        </div>
        <div className='gap-4 gap-y-6 grid grid-cols-auto w-full animate-pulse'>
          {Array.from({ length: 4 }).map((_, idx) => (
            <div
              key={idx}
              className='border border-gray-200 rounded-xl overflow-hidden'
            >
              {/* Image */}
              <div className='bg-gray-200 w-full h-52' />

              {/* Content */}
              <div className='p-4'>
                {/* Availability */}
                <div className='flex items-center gap-2 mb-3'>
                  <div className='bg-gray-200 rounded-full size-2' />
                  <div className='bg-gray-200 rounded w-24 h-3' />
                </div>

                {/* Name */}
                <div className='bg-gray-200 mb-2 rounded w-40 h-5' />

                {/* Specialty */}
                <div className='bg-gray-200 rounded w-28 h-4' />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const getSlots = (doctorInfo?: Doctor) => {
  const today = new Date();
  const timeSlots: { datetime: Date; time: string }[][] = [];

  // Last possible slot is 8:30 PM
  const lastSlotTime = new Date(today);
  lastSlotTime.setHours(20, 30, 0, 0);

  // Skip today if we're past the last slot
  const isLateEvening = today > lastSlotTime;

  const startIdx = isLateEvening ? 1 : 0;
  const endIdx = startIdx + 7;

  for (let idx = startIdx; idx < endIdx; idx++) {
    const currentDate = new Date(today);
    currentDate.setDate(today.getDate() + idx);

    // Clinic closes at 9 PM
    const endTime = new Date(currentDate);
    endTime.setHours(21, 0, 0, 0);

    // TODAY
    if (today.toDateString() === currentDate.toDateString()) {
      const now = new Date();

      let hour = now.getHours();
      let minute = now.getMinutes();

      // Round to next 30-min slot
      if (minute === 0) {
        minute = 0;
      } else if (minute <= 30) {
        minute = 30;
      } else {
        hour += 1;
        minute = 0;
      }

      currentDate.setHours(hour, minute, 0, 0);

      // Earliest slot = 8:30 AM
      const minStart = new Date(currentDate);
      minStart.setHours(8, 30, 0, 0);

      if (currentDate < minStart) {
        currentDate.setHours(8, 30, 0, 0);
      }
    } else {
      // Future days start at 8:30 AM
      currentDate.setHours(8, 30, 0, 0);
    }

    const dayTimeSlots: { datetime: Date; time: string }[] = [];

    while (currentDate < endTime) {
      const formattedTime = currentDate.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });

      const day = currentDate.getDate();
      const month = currentDate.getMonth() + 1;
      const year = currentDate.getFullYear();
      const slotDate = `${day}_${month}_${year}`;
      const slotTime = formattedTime;
      const isSlotAvailable =
        !doctorInfo?.slotsBooked[slotDate]?.includes(slotTime);

      if (isSlotAvailable)
        dayTimeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime,
        });

      // Move to next slot
      currentDate.setMinutes(currentDate.getMinutes() + 30);
    }

    timeSlots.push(dayTimeSlots);
  }

  return timeSlots;
};

export const Appointment = () => {
  const { currencySymbol, doctors, fetchDoctors, isDoctorsLoading, token } =
    useAppContext();

  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');

  const navigate = useNavigate();
  const { docId } = useParams();

  const doctorInfo = doctors.find((doctor) => doctor._id === docId);
  const doctorSlots = getSlots(doctorInfo);

  const handleBookAppointment = async () => {
    if (!token) {
      toast.warn('Login to book an appointment');
      navigate('/login');
      return;
    }

    if (!slotTime) {
      toast.error('Please select a timeslot');
      return;
    }

    try {
      const date = doctorSlots[slotIndex][0].datetime;
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const slotDate = `${day}_${month}_${year}`;
      const payload = { docId, slotDate, slotTime };
      const res = await api.post('/user/book-appointment', payload);
      toast.success(res.data.message);
      fetchDoctors();
      navigate('/my-appointments');
    } catch (error) {
      toast.error((error as Error).message);
      console.error(error);
    }
  };

  if (isDoctorsLoading || !doctorInfo) return <DoctorProfileSkeleton />;

  return (
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
            <img className='w-5' src={assets.verified_icon} alt='verified' />
          </p>

          <div className='flex items-center gap-2 mt-1 text-gray-600'>
            <p>
              {doctorInfo.degree} - {doctorInfo.specialty}
            </p>
            <button className='px-2 py-0.5 border rounded-full text-xs'>
              {doctorInfo.experience}
            </button>
          </div>

          <p className='flex items-center gap-1 mt-3 font-medium text-gray-900 text-sm'>
            About
            <img className='w-3' src={assets.info_icon} alt='info' />
          </p>

          <p className='mt-1 max-w-[700px] text-gray-500 text-sm'>
            {doctorInfo.about}
          </p>

          <p className='mt-4 font-medium text-gray-600'>
            Appointment fee:{' '}
            <span className='text-gray-800'>
              {currencySymbol}
              {doctorInfo.fee}
            </span>
          </p>
        </div>
      </div>

      {/* Slots */}
      <div className='mt-8 sm:ml-72 sm:pl-4 font-medium text-gray-700'>
        <p>Booking slots</p>

        <div className='flex items-center gap-3 mt-4 w-full overflow-x-scroll'>
          {doctorSlots.map((daySlots, idx) => (
            <div
              key={idx}
              className={cn(
                'py-6 border border-gray-200 rounded-full min-w-16 text-center cursor-pointer',
                { 'bg-primary text-white': idx === slotIndex }
              )}
              onClick={() => setSlotIndex(idx)}
            >
              <p>{DAYS_OF_WEEK[daySlots[0]?.datetime.getDay()]}</p>
              <p>{daySlots[0]?.datetime.getDate()}</p>
            </div>
          ))}
        </div>

        <div className='flex items-center gap-3 mt-4 w-full overflow-x-scroll'>
          {doctorSlots[slotIndex].map((slot) => (
            <p
              key={slot.time}
              className={cn(
                'flex-shrink-0 px-5 py-2 border border-gray-300 rounded-full font-light text-gray-400 text-sm cursor-pointer',
                { 'bg-primary text-white': slot.time === slotTime }
              )}
              onClick={() => setSlotTime(slot.time)}
            >
              {slot.time.toLowerCase()}
            </p>
          ))}
        </div>

        {doctorInfo.available ? (
          <button
            className='bg-primary my-6 px-20 py-3 rounded-full font-light text-white text-sm'
            onClick={handleBookAppointment}
          >
            Book an appointment
          </button>
        ) : (
          <button className='my-6 px-20 py-3 border border-gray-500 rounded-full font-light text-gray-500 text-sm'>
            Doctor is not available
          </button>
        )}
      </div>

      <RelatedDoctors docId={docId!} specialty={doctorInfo.specialty} />
    </>
  );
};
