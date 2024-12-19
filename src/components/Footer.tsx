import { assets } from '../assets/assets';

export const Footer = () => {
  return (
    <div className='md:mx-10'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 mb-10 mt-40 text-sm'>
        <div>
          <img className='mb-5 w-40' src={assets.logo} alt='app-logo' />
          <p className='w-full md:w-2/3 text-gray-600 leading-6'>
            Welcome to our Doctor Appointment Booking App, designed to simplify
            scheduling your medical consultations. Whether you need a routine
            check-up or a specialist, our app allows you to effortlessly book
            appointments with healthcare professionals. With an easy-to-use
            interface, you can choose your preferred doctor, select available
            time slots, and manage your appointments at your convenience. Our
            service aims to make healthcare more accessible and efficient for
            everyone.
          </p>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>COMPANY</p>

          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>Home</li>
            <li>About Us</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>

          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>+0-000-000-000</li>
            <li>johnsmith@email.com</li>
          </ul>
        </div>
      </div>

      <div>
        <hr />

        <p className='py-5 text-sm text-center'>
          Copyright {new Date().getFullYear()} @ Prescripto - All Right
          Reserved.
        </p>
      </div>
    </div>
  );
};
