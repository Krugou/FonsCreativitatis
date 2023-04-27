import {useEffect} from 'react';

const usePageTitle = (location, restaurantName) => {
  useEffect(() => {
    const title = restaurantName
      ? `${location} - ${restaurantName} | JAKReviews`
      : `${location} | JAKReviews`;
    document.title = title;
  }, [location, restaurantName]);
};

export default usePageTitle;
