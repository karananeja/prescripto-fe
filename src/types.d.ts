interface Doctor {
  _id: string;
  name: string;
  image: string;
  specialty: string;
  degree: string;
  experience: string;
  about: string;
  available: boolean;
  fee: number;
  address: { line1: string; line2: string };
  date: number;
  slotsBooked: Record<string, string[]>;
}

interface UserData {
  name: string;
  email: string;
  image: string;
  address: { line1: string; line2: string };
  gender: string;
  dob: string;
  phone: string;
}

interface Appointment {
  _id: string;
  userId: string;
  docId: string;
  slotDate: string;
  slotTime: string;
  userData: { name: string; email: string; phone: string };
  docData: {
    name: string;
    specialty: string;
    fee: number;
    image: string;
    address: { line1: string; line2: string };
  };
  amount: number;
  date: number;
  cancelled: boolean;
  payment: boolean;
  isCompleted: boolean;
}
