import about_image from './about_image.png';
import appointment_img from './appointment_img.png';
import arrow_icon from './arrow_icon.svg';
import chats_icon from './chats_icon.svg';
import contact_image from './contact_image.png';
import cross_icon from './cross_icon.png';
import Dermatologist from './Dermatologist.svg';
import doc1 from './doc1.png';
import doc10 from './doc10.png';
import doc11 from './doc11.png';
import doc12 from './doc12.png';
import doc13 from './doc13.png';
import doc14 from './doc14.png';
import doc15 from './doc15.png';
import doc2 from './doc2.png';
import doc3 from './doc3.png';
import doc4 from './doc4.png';
import doc5 from './doc5.png';
import doc6 from './doc6.png';
import doc7 from './doc7.png';
import doc8 from './doc8.png';
import doc9 from './doc9.png';
import dropdown_icon from './dropdown_icon.svg';
import Gastroenterologist from './Gastroenterologist.svg';
import General_physician from './General_physician.svg';
import group_profiles from './group_profiles.png';
import Gynecologist from './Gynecologist.svg';
import header_img from './header_img.png';
import info_icon from './info_icon.svg';
import logo from './logo.svg';
import menu_icon from './menu_icon.svg';
import Neurologist from './Neurologist.svg';
import Pediatrician from './Pediatrician.svg';
import profile_pic from './profile_pic.png';
import razorpay_logo from './razorpay_logo.png';
import stripe_logo from './stripe_logo.png';
import upload_icon from './upload_icon.png';
import verified_icon from './verified_icon.svg';

export const assets = {
  appointment_img,
  header_img,
  group_profiles,
  logo,
  chats_icon,
  verified_icon,
  info_icon,
  profile_pic,
  arrow_icon,
  contact_image,
  about_image,
  menu_icon,
  cross_icon,
  dropdown_icon,
  upload_icon,
  stripe_logo,
  razorpay_logo,
};

export const specialtyData = [
  { specialty: 'General physician', image: General_physician },
  { specialty: 'Gynecologist', image: Gynecologist },
  { specialty: 'Dermatologist', image: Dermatologist },
  { specialty: 'Pediatrician', image: Pediatrician },
  { specialty: 'Neurologist', image: Neurologist },
  { specialty: 'Gastroenterologist', image: Gastroenterologist },
];

export const doctors = [
  {
    _id: 'doc1',
    name: 'Dr. Richard James',
    image: doc1,
    specialty: 'General physician',
    degree: 'MBBS',
    experience: '4 Years',
    about:
      'Dr. Richard James is a dedicated general physician with 4 years of experience, committed to delivering comprehensive healthcare services. He specializes in preventive medicine, early diagnosis, and effective treatment strategies, ensuring the well-being of his patients at all stages of life.',
    fees: 500,
    address: {
      line1: '17th Cross, Richmond',
      line2: 'Circle, Ring Road, London',
    },
  },
  {
    _id: 'doc2',
    name: 'Dr. Emily Larson',
    image: doc2,
    specialty: 'Gynecologist',
    degree: 'MBBS',
    experience: '3 Years',
    about:
      "Dr. Emily Larson is a compassionate gynecologist with 3 years of experience in women's health. She focuses on preventive care, diagnosis, and treatment of various gynecological conditions, ensuring her patients receive the highest level of care and support throughout their healthcare journey.",
    fees: 600,
    address: {
      line1: '27th Cross, Richmond',
      line2: 'Circle, Ring Road, London',
    },
  },
  {
    _id: 'doc3',
    name: 'Dr. Sarah Patel',
    image: doc3,
    specialty: 'Dermatologist',
    degree: 'MBBS',
    experience: '1 Years',
    about:
      'Dr. Sarah Patel, a skilled dermatologist with 1 year of experience, specializes in skin care, treating a wide range of dermatological conditions. She is passionate about improving the skin health and appearance of her patients through personalized treatment plans.',
    fees: 300,
    address: {
      line1: '37th Cross, Richmond',
      line2: 'Circle, Ring Road, London',
    },
  },
  {
    _id: 'doc4',
    name: 'Dr. Christopher Lee',
    image: doc4,
    specialty: 'Pediatrician',
    degree: 'MBBS',
    experience: '2 Years',
    about:
      'Dr. Christopher Lee is a dedicated pediatrician with 2 years of experience in providing quality care to children. His focus is on promoting the health, growth, and development of young patients, offering guidance to parents to ensure the best outcomes for their children.',
    fees: 400,
    address: {
      line1: '47th Cross, Richmond',
      line2: 'Circle, Ring Road, London',
    },
  },
  {
    _id: 'doc5',
    name: 'Dr. Jennifer Garcia',
    image: doc5,
    specialty: 'Neurologist',
    degree: 'MBBS',
    experience: '4 Years',
    about:
      'Dr. Jennifer Garcia is a highly skilled neurologist with 4 years of experience. She specializes in diagnosing and treating disorders of the nervous system, including conditions like migraines, epilepsy, and neurological disorders, ensuring that her patients receive expert care.',
    fees: 500,
    address: {
      line1: '57th Cross, Richmond',
      line2: 'Circle, Ring Road, London',
    },
  },
  {
    _id: 'doc6',
    name: 'Dr. Andrew Williams',
    image: doc6,
    specialty: 'Gastroenterologist',
    degree: 'MBBS',
    experience: '4 Years',
    about:
      'Dr. Andrew Williams is an experienced gastroenterologist with 4 years of expertise in diagnosing and treating digestive disorders. From chronic conditions like IBS to complex gastrointestinal issues, he provides compassionate and personalized care to optimize digestive health.',
    fees: 500,
    address: {
      line1: '57th Cross, Richmond',
      line2: 'Circle, Ring Road, London',
    },
  },
  {
    _id: 'doc7',
    name: 'Dr. Christopher Davis',
    image: doc7,
    specialty: 'General physician',
    degree: 'MBBS',
    experience: '4 Years',
    about:
      'Dr. Christopher Davis is a dedicated general physician with 4 years of experience. He is committed to providing holistic and personalized care, focusing on preventive measures and early detection to help his patients achieve and maintain optimal health.',
    fees: 500,
    address: {
      line1: '17th Cross, Richmond',
      line2: 'Circle, Ring Road, London',
    },
  },
  {
    _id: 'doc8',
    name: 'Dr. Timothy White',
    image: doc8,
    specialty: 'Gynecologist',
    degree: 'MBBS',
    experience: '3 Years',
    about:
      "Dr. Timothy White is an empathetic gynecologist with 3 years of experience in women's health. He offers expert care in various areas such as reproductive health, prenatal care, and gynecological procedures, with a focus on compassionate and patient-centered treatment.",
    fees: 600,
    address: {
      line1: '27th Cross, Richmond',
      line2: 'Circle, Ring Road, London',
    },
  },
  {
    _id: 'doc9',
    name: 'Dr. Ava Mitchell',
    image: doc9,
    specialty: 'Dermatologist',
    degree: 'MBBS',
    experience: '1 Years',
    about:
      'Dr. Ava Mitchell, with 1 year of experience as a dermatologist, provides expert care for various skin conditions. She is passionate about improving skin health through personalized treatment plans and strives to make her patients feel confident in their skin.',
    fees: 300,
    address: {
      line1: '37th Cross, Richmond',
      line2: 'Circle, Ring Road, London',
    },
  },
  {
    _id: 'doc10',
    name: 'Dr. Jeffrey King',
    image: doc10,
    specialty: 'Pediatrician',
    degree: 'MBBS',
    experience: '2 Years',
    about:
      "Dr. Jeffrey King is a caring pediatrician with 2 years of experience in treating children. He focuses on providing age-appropriate care, monitoring growth and development, and offering guidance to parents to ensure their child's health and well-being.",
    fees: 400,
    address: {
      line1: '47th Cross, Richmond',
      line2: 'Circle, Ring Road, London',
    },
  },
  {
    _id: 'doc11',
    name: 'Dr. Zoe Kelly',
    image: doc11,
    specialty: 'Neurologist',
    degree: 'MBBS',
    experience: '4 Years',
    about:
      'Dr. Zoe Kelly is a compassionate neurologist with 4 years of experience in diagnosing and treating neurological disorders. She focuses on providing specialized care for conditions like epilepsy, migraines, and neurological injuries, aiming to improve quality of life for her patients.',
    fees: 500,
    address: {
      line1: '57th Cross, Richmond',
      line2: 'Circle, Ring Road, London',
    },
  },
  {
    _id: 'doc12',
    name: 'Dr. Patrick Harris',
    image: doc12,
    specialty: 'Gastroenterologist',
    degree: 'MBBS',
    experience: '4 Years',
    about:
      'Dr. Patrick Harris is an experienced gastroenterologist with 4 years of expertise in treating digestive conditions. He specializes in conditions such as acid reflux, irritable bowel syndrome, and liver diseases, offering effective treatments and a personalized care plan for each patient.',
    fees: 500,
    address: {
      line1: '57th Cross, Richmond',
      line2: 'Circle, Ring Road, London',
    },
  },
  {
    _id: 'doc13',
    name: 'Dr. Chloe Evans',
    image: doc13,
    specialty: 'General physician',
    degree: 'MBBS',
    experience: '4 Years',
    about:
      'Dr. Chloe Evans is a dedicated general physician with 4 years of experience. She focuses on preventive care and early detection of health conditions, working closely with her patients to ensure they live a healthy and fulfilling life.',
    fees: 500,
    address: {
      line1: '17th Cross, Richmond',
      line2: 'Circle, Ring Road, London',
    },
  },
  {
    _id: 'doc14',
    name: 'Dr. Ryan Martinez',
    image: doc14,
    specialty: 'Gynecologist',
    degree: 'MBBS',
    experience: '3 Years',
    about:
      "Dr. Ryan Martinez is an empathetic gynecologist with 3 years of experience in providing comprehensive care for women's health. He specializes in reproductive health, prenatal care, and gynecological surgeries, ensuring that his patients receive compassionate and expert care.",
    fees: 600,
    address: {
      line1: '27th Cross, Richmond',
      line2: 'Circle, Ring Road, London',
    },
  },
  {
    _id: 'doc15',
    name: 'Dr. Amelia Hill',
    image: doc15,
    specialty: 'Dermatologist',
    degree: 'MBBS',
    experience: '1 Years',
    about:
      "Dr. Amelia Hill is a skilled dermatologist with 1 year of experience. She is dedicated to providing effective treatments for skin conditions and is passionate about improving her patients' skin health with personalized care and attention to detail.",
    fees: 300,
    address: {
      line1: '37th Cross, Richmond',
      line2: 'Circle, Ring Road, London',
    },
  },
];
