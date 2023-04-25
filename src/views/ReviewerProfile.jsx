import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {doFetch} from '../hooks/ApiHooks';
import {baseUrl} from '../utils/variables';

const ReviewerProfile = (props) => {
  const {id} = useParams();
  console.log('🚀 ~ file: ReviewerProfile.jsx ~ ReviewerProfile ~ id', id);

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      const url = `${baseUrl}media/user/${id}`;
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
      try {
        const data = await doFetch(url, options);
        setUserData(data);
      } catch (e) {
        console.log(e.message);
      }
    };

    getUserData();
  }, [id]);

  return (
    <div>
      <h1>Reviewer Profile</h1>
      {userData ? (
        userData.map((item) => <p key={item.title}>{item.title}</p>)
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default ReviewerProfile;
