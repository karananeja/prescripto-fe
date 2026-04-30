import { assets } from '../assets/assets';

export const About = () => {
  return (
    <>
      <p className='pt-10 text-gray-500 text-2xl text-center'>
        ABOUT <span className='font-semibold text-gray-700'>US</span>
      </p>

      <div className='flex md:flex-row flex-col gap-12 my-10'>
        <img
          className='w-full md:max-w-[22.5rem]'
          src={assets.about_image}
          alt='about-logo'
        />

        <div className='flex flex-col justify-center gap-6 md:w-1/2 text-gray-600 text-sm'>
          <p>
            Welcome to Prescripto, your trusted partner in managing your
            healthcare needs conveniently and efficiently. At Prescripto, we
            understand the challenges individuals face when it comes to
            scheduling doctor appointments and managing their health records.
          </p>
          <p>
            Prescripto is committed to excellence in healthcare technology. We
            continuously strive to enhance our platform, integrating the latest
            advancements to improve user experience and deliver superior
            service. Whether you're booking your first appointment or managing
            ongoing care, Prescripto is here to support you every step of the
            way.
          </p>
          <b className='text-gray-800'>Our Vision</b>
          <p>
            Our vision at Prescripto is to create a seamless healthcare
            experience for every user. We aim to bridge the gap between patients
            and healthcare providers, making it easier for you to access the
            care you need, when you need it.
          </p>
        </div>
      </div>

      <div className='my-4 text-xl'>
        <p>
          WHY <span className='font-semibold text-gray-700'>CHOOSE US</span>
        </p>
      </div>

      <div className='flex md:flex-row flex-col mb-20'>
        <div className='flex flex-col gap-5 hover:bg-primary px-10 md:px-16 py-8 sm:py-16 border text-[15px] text-gray-600 hover:text-white transition-all duration-300 cursor-pointer'>
          <b>EFFICIENCY:</b>
          <p>
            Streamlined appointment scheduling that fits into your busy
            lifestyle.
          </p>
        </div>
        <div className='flex flex-col gap-5 hover:bg-primary px-10 md:px-16 py-8 sm:py-16 border text-[15px] text-gray-600 hover:text-white transition-all duration-300 cursor-pointer'>
          <b>CONVENIENCE:</b>
          <p>
            Access to a network of trusted healthcare professionals in your
            area.
          </p>
        </div>
        <div className='flex flex-col gap-5 hover:bg-primary px-10 md:px-16 py-8 sm:py-16 border text-[15px] text-gray-600 hover:text-white transition-all duration-300 cursor-pointer'>
          <b>PERSONALIZATION:</b>
          <p>
            Tailored recommendations and reminders to help you stay on top of
            your health.
          </p>
        </div>
      </div>
    </>
  );
};
