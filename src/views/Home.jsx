import React from 'react';
import HeroImage from '../components/HeroImage';
import ReviewTable from '../components/ReviewTable';
import usePageTitle from '../hooks/UsePageTitle';
import useScrollToTop from '../hooks/UseScrollToTop';

const Home = () => {
  const viewText = 'Home';
  useScrollToTop();
  usePageTitle(viewText);

  return (
    <>
      <HeroImage heroText={viewText} />
      <ReviewTable />
    </>
  );
};

export default Home;
