import React from 'react';
import HeroImage from '../components/HeroImage';
import ReviewTable from '../components/ReviewTable';
import usePageTitle from '../hooks/usePageTitle';
const Home = () => {
  usePageTitle('Home');
  return (
    <>
      <HeroImage heroText="Home" />
      <ReviewTable />
    </>
  );
};

export default Home;
