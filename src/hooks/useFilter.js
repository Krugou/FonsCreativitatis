import {useEffect, useState} from 'react';

const useFilter = (media) => {
  const [filteredMedia, setFilteredMedia] = useState(media);
  const [uniqueCities, setUniqueCities] = useState([]);
  const [uniqueTags, setUniqueTags] = useState([]);
  const [uniqueRestaurants, setUniqueRestaurants] = useState([]);

  useEffect(() => {
    const cities = new Set(media.map((item) => item.city));
    setUniqueCities([...cities]);

    const tags = new Set(media.flatMap((item) => item.tags.map((t) => t.tag)));
    setUniqueTags([...tags]);

    const restaurants = new Set(media.map((item) => item.title));
    setUniqueRestaurants([...restaurants]);
  }, [media]);

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
    uniqueCities,
    uniqueTags,
    uniqueRestaurants,
  };
};

export default useFilter;
