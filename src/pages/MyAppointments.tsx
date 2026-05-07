import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { env } from '../config/env';
import { useAppContext } from '../context/AppContext';
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
  const { fetchDoctors } = useAppContext();

  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await api.get('/user/get-appointments');
        setAppointments(res.data.appointments);
      } catch (error) {
        toast.error((error as Error).message);
        console.error(error);
      }
    };

    fetchAppointments();
  }, []);

  const handleCancelAppointment = async (appointmentId: string) => {
    try {
      const payload = { appointmentId };
      const res = await api.post('/user/cancel-appointment', payload);
      toast.success(res.data.message);
      setAppointments((prev) =>
        prev.map((appointment) =>
          appointment._id === appointmentId
            ? { ...appointment, cancelled: true }
            : appointment
        )
      );
      fetchDoctors();
    } catch (error) {
      toast.error((error as Error).message);
      console.error(error);
    }
  };

  const initializePayment = async (order: RazorpayOrder) => {
    try {
      const options = {
        key: env.RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'Appointment Payment',
        description: 'Payment for your appointment',
        order_id: order.id,
        receipt: order.receipt,
        handler: async (response: RazorpayResponse) => {
          const payload = { razorpay_order_id: response.razorpay_order_id };
          const res = await api.post('/user/verify-payment', payload);
          toast.success(res.data.message);
          setAppointments((prev) =>
            prev.map((appointment) =>
              appointment._id === order.receipt
                ? { ...appointment, payment: true }
                : appointment
            )
          );
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const handleMakePayment = async (appointmentId: string) => {
    try {
      const payload = { appointmentId };
      const res = await api.post('/user/make-payment', payload);
      initializePayment(res.data.order);
    } catch (error) {
      toast.error((error as Error).message);
      console.error(error);
    }
  };

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
                {!appointment.cancelled && !appointment.payment && (
                  <button
                    className='hover:bg-primary py-2 border rounded sm:min-w-48 text-stone-500 hover:text-white text-sm text-center transition-all duration-300'
                    onClick={() => handleMakePayment(appointment._id)}
                  >
                    Pay Online
                  </button>
                )}

                {!appointment.cancelled && appointment.payment && (
                  <button
                    className='bg-indigo-50 py-2 border rounded sm:min-w-48 text-stone-500 text-sm text-center'
                    disabled
                  >
                    Paid
                  </button>
                )}

                {!appointment.cancelled && (
                  <button
                    className='hover:bg-red-600 py-2 border rounded sm:min-w-48 text-stone-500 hover:text-white text-sm text-center transition-all duration-300'
                    onClick={() => handleCancelAppointment(appointment._id)}
                  >
                    Cancel Appointment
                  </button>
                )}

                {appointment.cancelled && (
                  <button
                    className='py-2 border rounded sm:min-w-48 text-red-400 text-sm text-center'
                    disabled
                  >
                    Appointment Cancelled
                  </button>
                )}
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
