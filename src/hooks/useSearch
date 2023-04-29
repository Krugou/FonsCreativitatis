// hooks/useSearch.js
import {useEffect, useState} from 'react';

const useSearch = (searchMedia, initialSearch = '') => {
  const [searchError, setSearchError] = useState(false);
  const [title, setTitle] = useState(initialSearch);
  const [media, setMedia] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [typingTimeout, setTypingTimeout] = useState(0);

  const handleSearch = async (event) => {
    const inputValue = event?.target?.value || title;

    if (event) {
      setTitle(inputValue);
    }

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    setTypingTimeout(
      setTimeout(async () => {
        if (inputValue.length >= 2) {
          setSearchError(false);

          setIsLoading(true);
          try {
            const result = await searchMedia(inputValue);
            setMedia(result);
            setIsLoading(false);
          } catch (error) {
            setError(error);
            setIsLoading(false);
          }
        } else {
          setSearchError(true);
        }
      }, 800)
    );
  };

  useEffect(() => {
    if (initialSearch) {
      handleSearch();
    }
  }, [initialSearch]);

  return {searchError, title, setTitle, media, isLoading, error, handleSearch};
};

export default useSearch;
