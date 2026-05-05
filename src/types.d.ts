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
