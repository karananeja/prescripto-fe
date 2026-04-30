import { assets } from '../assets/assets';

export const Contact = () => {
  return (
    <>
      <p className='pt-10 text-gray-500 text-2xl text-center'>
        CONTACT <span className='font-semibold text-gray-700'>US</span>
      </p>

      <div className='flex md:flex-row flex-col justify-center gap-10 my-10 mb-28 text-sm'>
        <img
          className='w-full md:max-w-[22.5rem]'
          src={assets.contact_image}
          alt='contact-logo'
        />

        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-gray-600 text-lg'>OUR OFFICE</p>
          <p className='text-gray-500'>
            00000 Williams Station <br /> Suite 000, Washington, USA
          </p>
          <p className='text-gray-500'>
            Tel: (000) 000-0000 <br /> Email: johnsmith@email.com
          </p>
          <p className='font-semibold text-gray-600 text-lg'>
            CAREERS AT PRESCRIPTO
          </p>
          <p className='text-gray-500'>
            Learn more about our teams and job openings.
          </p>
          <button className='hover:bg-primary px-8 py-4 border border-primary rounded-full hover:text-white text-sm transition-all duration-300'>
            Explore Jobs
          </button>
        </div>
      </div>
    </>
  );
};
