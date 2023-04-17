import React, {useContext, useEffect} from 'react';
import {Navigate} from 'react-router-dom';
import {MediaContext} from '../contexts/MediaContext';

const Logout = (props) => {
  const {setUser} = useContext(MediaContext);
  useEffect(() => {
    setUser(null);
    localStorage.removeItem('userToken');
  }, []);
  return <Navigate to="/" />;
};

export default Logout;
