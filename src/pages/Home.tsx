import { Banner } from '../components/Banner';
import { Header } from '../components/Header';
import { SpecialtyMenu } from '../components/SpecialtyMenu';
import { TopDoctors } from '../components/TopDoctors';

export const Home = () => {
  return (
    <div>
      <Header />

      <SpecialtyMenu />

      <TopDoctors />

      <Banner />
    </div>
  );
};
