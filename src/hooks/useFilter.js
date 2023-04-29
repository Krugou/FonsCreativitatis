import {useState} from 'react';

const useFilter = (media) => {
  const [filteredMedia, setFilteredMedia] = useState(media);

  const filterByTag = (tag) => {
    const filtered = media.filter((item) =>
      item.tags.some((t) => t.tag === tag)
    );
    setFilteredMedia(filtered);
  };

  const filterByCity = (city) => {
    const filtered = media.filter((item) => item.city === city);
    setFilteredMedia(filtered);
  };

  const filterByRestaurants = (restaurant) => {
    const filtered = media.filter((item) => item.title === restaurant);
    setFilteredMedia(filtered);
  };

  const resetMedia = () => {
    setFilteredMedia(media);
  };

  return {
    filteredMedia,
    filterByTag,
    filterByCity,
    filterByRestaurants,
    resetMedia,
  };
};

export default useFilter;
